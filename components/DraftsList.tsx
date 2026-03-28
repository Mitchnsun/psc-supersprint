import { useState } from 'react';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { DraftResult } from '@/utils/drafts';

interface DraftsListProps {
  drafts: DraftResult[];
  editingDraftId: string | null;
  onEdit: (draftId: string) => void;
  onDelete: (draftId: string) => void;
  onDeleteAll: () => void;
  onSubmitAll: () => Promise<string[]>;
}

const DraftsList = ({ drafts, editingDraftId, onEdit, onDelete, onDeleteAll, onSubmitAll }: DraftsListProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitErrors, setSubmitErrors] = useState<string[]>([]);
  const [submitError, setSubmitError] = useState<string | null>(null);

  if (drafts.length === 0) return null;

  const handleSubmitAll = async () => {
    setIsSubmitting(true);
    setSubmitErrors([]);
    setSubmitError(null);
    try {
      const failed = await onSubmitAll();
      setSubmitErrors(failed);
    } catch {
      setSubmitError("Une erreur est survenue lors de l'envoi des brouillons. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Brouillons ({drafts.length})</h2>
        <div className="flex gap-2">
          <Button onClick={handleSubmitAll} disabled={isSubmitting} variant="default">
            Valider tout
          </Button>
          <Button onClick={onDeleteAll} disabled={isSubmitting} variant="secondary">
            Supprimer tout
          </Button>
        </div>
      </div>
      {submitError && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{submitError}</AlertDescription>
        </Alert>
      )}
      {submitErrors.length > 0 && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>
            Tous les brouillons doivent contenir les informations obligatoires. Dossards incomplets :{' '}
            {submitErrors.join(', ')}
          </AlertDescription>
        </Alert>
      )}
      <div className="space-y-2">
        {drafts.map((draft) => (
          <div
            key={draft.id}
            className={cn('flex items-center justify-between rounded border p-3', {
              'border-blue-500 bg-blue-50': editingDraftId === draft.id,
            })}
          >
            <div className="flex-1">
              <span className="font-medium">{draft.bib ? `#${draft.bib}` : 'Sans dossard'}</span>
              {(draft.firstname || draft.lastname) && (
                <span className="ml-2 text-sm text-gray-600">
                  {[draft.firstname, draft.lastname].filter(Boolean).join(' ')}
                </span>
              )}
              <span className="ml-2 text-xs text-gray-400">{new Date(draft.savedAt).toLocaleTimeString()}</span>
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={() => onEdit(draft.id)} disabled={isSubmitting || editingDraftId === draft.id}>
                Éditer
              </Button>
              <Button size="sm" variant="secondary" onClick={() => onDelete(draft.id)} disabled={isSubmitting}>
                Supprimer
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DraftsList;
