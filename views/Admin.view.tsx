import { push, ref, set } from 'firebase/database';
import { useEffect, useMemo, useState } from 'react';

import AddResultForm, { timeCalculus } from '@/components/AddResult';
import DraftsList from '@/components/DraftsList';
import LoginForm from '@/components/LoginForm';
import db from '@/lib/firebase';
import { YEAR } from '@/utils/constants';
import UserContext, { INITIAL_USER } from '@/utils/context/user.context';
import { DraftResult, loadDrafts, saveDraftsToStorage } from '@/utils/drafts';
import { FormValues, schema } from '@/utils/results';

const AdminView = () => {
  const [user, setUser] = useState(INITIAL_USER);
  const [drafts, setDrafts] = useState<DraftResult[]>([]);
  const [editingDraftId, setEditingDraftId] = useState<string | null>(null);
  const userMemo = useMemo(() => ({ user, setUser }), [user]);

  useEffect(() => {
    setDrafts(loadDrafts());
  }, []);

  const updateDrafts = (updated: DraftResult[]) => {
    setDrafts(updated);
    saveDraftsToStorage(updated);
  };

  const handleDraftSave = (values: Partial<FormValues>, draftId?: string) => {
    const id = draftId ?? Date.now().toString();
    const draft: DraftResult = { id, savedAt: Date.now(), ...values };
    const updated = draftId ? drafts.map((d) => (d.id === draftId ? draft : d)) : [...drafts, draft];
    updateDrafts(updated);
    setEditingDraftId(id);
  };

  const handleSubmitSuccess = (draftId?: string) => {
    if (draftId) {
      updateDrafts(drafts.filter((d) => d.id !== draftId));
    }
    setEditingDraftId(null);
  };

  const handleEdit = (draftId: string) => {
    setEditingDraftId(draftId);
  };

  const handleDelete = (draftId: string) => {
    updateDrafts(drafts.filter((d) => d.id !== draftId));
    if (editingDraftId === draftId) setEditingDraftId(null);
  };

  const handleSubmitAll = async (): Promise<string[]> => {
    const failed: string[] = [];
    const successful: string[] = [];

    for (const draft of drafts) {
      try {
        const values = await schema.validate({ ...draft }, { abortEarly: false });
        const { key } = await push(ref(db, YEAR.toString()));
        await set(ref(db, `${YEAR}/${key}`), {
          firstname: values.firstname,
          lastname: values.lastname,
          bib: values.bib,
          sex: values.gender,
          status: values.status === 'finisher' ? '' : values.status,
          cat: values.category,
          ...(values.bikeNumber && { bikeNumber: values.bikeNumber }),
          ...(values.wave && { wave: values.wave }),
          ...timeCalculus(values.times),
        });
        successful.push(draft.id);
      } catch (error) {
        failed.push(draft.bib?.toString() ?? draft.id);
        console.error(`Failed to submit draft ${draft.id}:`, error);
      }
    }

    if (successful.length > 0) {
      const remaining = drafts.filter((d) => !successful.includes(d.id));
      updateDrafts(remaining);
      if (editingDraftId && successful.includes(editingDraftId)) {
        setEditingDraftId(null);
      }
    }

    return failed;
  };

  const editingDraft = drafts.find((d) => d.id === editingDraftId);

  return (
    <UserContext.Provider value={userMemo}>
      {user.isLoggedIn ? (
        <div className="flex flex-col gap-6">
          <AddResultForm
            key={editingDraftId ?? 'new'}
            draft={editingDraft}
            onDraftSave={handleDraftSave}
            onSubmitSuccess={handleSubmitSuccess}
          />
          <DraftsList
            drafts={drafts}
            editingDraftId={editingDraftId}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onSubmitAll={handleSubmitAll}
          />
        </div>
      ) : (
        <LoginForm />
      )}
    </UserContext.Provider>
  );
};

export default AdminView;
