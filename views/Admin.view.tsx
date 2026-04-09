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

  const updateDrafts = (updater: (prev: DraftResult[]) => DraftResult[]) => {
    setDrafts((prev) => {
      const updated = updater(prev);
      saveDraftsToStorage(updated);
      return updated;
    });
  };

  const handleDraftSave = (values: Partial<FormValues>, draftId?: string) => {
    const id = draftId ?? Date.now().toString();
    const draft: DraftResult = { id, savedAt: Date.now(), ...values };
    updateDrafts((prev) => (draftId ? prev.map((d) => (d.id === draftId ? draft : d)) : [...prev, draft]));
    setEditingDraftId(null);
  };

  const handleSubmitSuccess = (draftId?: string) => {
    if (draftId) {
      updateDrafts((prev) => prev.filter((d) => d.id !== draftId));
    }
    setEditingDraftId(null);
  };

  const handleEdit = (draftId: string) => {
    setEditingDraftId(draftId);
  };

  const handleDelete = (draftId: string) => {
    updateDrafts((prev) => prev.filter((d) => d.id !== draftId));
    if (editingDraftId === draftId) setEditingDraftId(null);
  };

  const handleDeleteAll = () => {
    updateDrafts(() => []);
    setEditingDraftId(null);
  };

  const handleSubmitAll = async (): Promise<string[]> => {
    // Phase 1: validate all drafts before any submission
    const invalid: string[] = [];
    const validatedDrafts: { draft: DraftResult; values: FormValues }[] = [];

    for (const draft of drafts) {
      try {
        const values = await schema.validate({ ...draft }, { abortEarly: false });
        validatedDrafts.push({ draft, values });
      } catch {
        invalid.push(draft.bib?.toString() ?? `sans dossard (${draft.id})`);
      }
    }

    if (invalid.length > 0) {
      return invalid;
    }

    // Phase 2: all drafts are valid, submit them
    const successful: string[] = [];

    for (const { draft, values } of validatedDrafts) {
      const newRef = push(ref(db, YEAR.toString()));
      await set(newRef, {
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
    }

    if (successful.length > 0) {
      updateDrafts((prev) => prev.filter((d) => !successful.includes(d.id)));
      if (editingDraftId && successful.includes(editingDraftId)) {
        setEditingDraftId(null);
      }
    }

    return [];
  };

  const editingDraft = drafts.find((d) => d.id === editingDraftId);

  return (
    <UserContext.Provider value={userMemo}>
      {user.isLoggedIn ? (
        <div className="flex flex-col gap-6">
          <AddResultForm
            key={editingDraftId ?? 'new'}
            draft={editingDraft}
            existingDrafts={drafts}
            onDraftSave={handleDraftSave}
            onSubmitSuccess={handleSubmitSuccess}
          />
          <DraftsList
            drafts={drafts}
            editingDraftId={editingDraftId}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onDeleteAll={handleDeleteAll}
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
