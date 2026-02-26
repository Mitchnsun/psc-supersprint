import { yupResolver } from '@hookform/resolvers/yup';
import { push, ref, set } from 'firebase/database';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import db from '@/lib/firebase';
import { CATEGORIES, categoryFromBirthYear } from '@/utils/categories.utils';
import { YEAR } from '@/utils/constants';
import { DraftResult } from '@/utils/drafts';
import { FormValues, schema } from '@/utils/results';
import Time from '@/utils/time';

export const timeCalculus = ({ swim, bike, total }: { swim: string; bike: string; total: string }) => {
  const swimSeconds = swim
    .split(':')
    .reverse()
    .reduce((acc, val, index) => acc + parseInt(val, 10) * 60 ** index, 0);
  const bikeSeconds = bike
    .split(':')
    .reverse()
    .reduce((acc, val, index) => acc + parseInt(val, 10) * 60 ** index, 0);
  const totalSeconds = total
    .split(':')
    .reverse()
    .reduce((acc, val, index) => acc + parseInt(val, 10) * 60 ** index, 0);

  const run = totalSeconds - swimSeconds - bikeSeconds;
  return { swim: swimSeconds, bike: bikeSeconds, run: run > 0 ? run : 0, total: totalSeconds };
};

interface AddResultFormProps {
  draft?: DraftResult;
  onDraftSave: (values: Partial<FormValues>, draftId?: string) => void;
  onSubmitSuccess?: (draftId?: string) => void;
}

const AddResultForm = ({ draft, onDraftSave, onSubmitSuccess }: AddResultFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const {
    control,
    reset,
    setValue,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      bib: draft?.bib ?? undefined,
      lastname: draft?.lastname ?? '',
      firstname: draft?.firstname ?? '',
      gender: draft?.gender ?? '',
      birthYear: draft?.birthYear ?? undefined,
      category: draft?.category ?? CATEGORIES[1].id,
      status: draft?.status ?? 'finisher',
      bikeNumber: draft?.bikeNumber ?? undefined,
      wave: draft?.wave ?? undefined,
      times: {
        swim: draft?.times?.swim ?? '',
        bike: draft?.times?.bike ?? '',
        total: draft?.times?.total ?? '',
      },
    },
  });

  const birthYear = watch('birthYear');

  useEffect(() => {
    const parsedYear = Number(birthYear);
    const isValidYear = birthYear && !isNaN(parsedYear) && parsedYear > 0;
    const category = isValidYear ? categoryFromBirthYear(birthYear) : null;
    setValue('category', category?.id || CATEGORIES[1].id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [birthYear]);

  const saveDraft = () => {
    const values = getValues();
    onDraftSave(values, draft?.id);
  };

  const onSubmit = async ({
    firstname,
    lastname,
    bib,
    gender,
    category,
    status: raceStatus,
    times,
    bikeNumber,
    wave,
  }: FormValues) => {
    setIsLoading(true);
    const { key } = await push(ref(db, YEAR.toString()));
    set(ref(db, `${YEAR}/${key}`), {
      firstname,
      lastname,
      bib,
      sex: gender,
      status: raceStatus === 'finisher' ? '' : raceStatus,
      cat: category,
      ...(bikeNumber && { bikeNumber }),
      ...(wave && { wave }),
      ...timeCalculus(times),
    })
      .then(() => {
        reset();
        onSubmitSuccess?.(draft?.id);
      })
      .catch((error: Error) => setStatus(error.message))
      .finally(() => setIsLoading(false));
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
      <FormField
        render={({ field }) => (
          <FormItem>
            <FormLabel>Numéro de dossard</FormLabel>
            <Input {...field} value={field.value ?? ''} />
            <FormMessage>{errors.bib?.message}</FormMessage>
          </FormItem>
        )}
        name="bib"
        control={control}
      />

      <div className="flex gap-4">
        <FormField
          render={({ field }) => (
            <FormItem className="w-38">
              <FormLabel>Numéro de vélo</FormLabel>
              <Input {...field} value={field.value ?? ''} type="number" />
              <FormMessage>{errors.bikeNumber?.message}</FormMessage>
            </FormItem>
          )}
          name="bikeNumber"
          control={control}
        />
        <FormField
          render={({ field }) => (
            <FormItem className="w-38">
              <FormLabel>Numéro de vague</FormLabel>
              <Input {...field} value={field.value ?? ''} type="number" />
              <FormMessage>{errors.wave?.message}</FormMessage>
            </FormItem>
          )}
          name="wave"
          control={control}
        />
      </div>

      <div className="flex gap-4">
        <FormField
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Nom</FormLabel>
              <Input {...field} />
              <FormMessage>{errors.lastname?.message}</FormMessage>
            </FormItem>
          )}
          name="lastname"
          control={control}
          defaultValue=""
        />
        <FormField
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Prénom</FormLabel>
              <Input {...field} />
              <FormMessage>{errors.firstname?.message}</FormMessage>
            </FormItem>
          )}
          name="firstname"
          control={control}
          defaultValue=""
        />
      </div>

      <FormField
        render={({ field }) => (
          <FormItem className="w-38">
            <FormLabel>Gender</FormLabel>
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="M">Homme (M)</SelectItem>
                <SelectItem value="F">Femme (F)</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage>{errors.gender?.message}</FormMessage>
          </FormItem>
        )}
        name="gender"
        control={control}
        defaultValue=""
      />

      <div className="flex gap-4">
        <FormField
          render={({ field }) => (
            <FormItem>
              <FormLabel>Année de naissance</FormLabel>
              <Input {...field} value={field.value ?? ''} maxLength={4} />
              <FormMessage>{errors.birthYear?.message}</FormMessage>
            </FormItem>
          )}
          name="birthYear"
          control={control}
        />
        <FormField
          render={({ field }) => (
            <FormItem className="w-38">
              <FormLabel>Catégorie</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.label} ({cat.id})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage>{errors.category?.message}</FormMessage>
            </FormItem>
          )}
          name="category"
          control={control}
          defaultValue={CATEGORIES[1].id}
        />
      </div>

      <div className="flex gap-4">
        <FormField
          render={({ field }) => (
            <FormItem className="w-38">
              <FormLabel>Swim</FormLabel>
              <Input {...field} onChange={(e) => field.onChange(Time.maskInput(e.target.value))} />
              <FormMessage>
                {errors.times?.swim?.message || (!Time.valid(field.value) && field.value ? 'Invalid time' : '')}
              </FormMessage>
            </FormItem>
          )}
          name="times.swim"
          control={control}
          defaultValue=""
        />
        <FormField
          render={({ field }) => (
            <FormItem className="w-38">
              <FormLabel>Bike</FormLabel>
              <Input {...field} onChange={(e) => field.onChange(Time.maskInput(e.target.value))} />
              <FormMessage>
                {errors.times?.bike?.message || (!Time.valid(field.value) && field.value ? 'Invalid time' : '')}
              </FormMessage>
            </FormItem>
          )}
          name="times.bike"
          control={control}
          defaultValue=""
        />
        <FormField
          render={({ field }) => (
            <FormItem className="w-38">
              <FormLabel>Total</FormLabel>
              <Input {...field} onChange={(e) => field.onChange(Time.maskInput(e.target.value))} />
              <FormMessage>
                {errors.times?.total?.message || (!Time.valid(field.value) && field.value ? 'Invalid time' : '')}
              </FormMessage>
            </FormItem>
          )}
          name="times.total"
          control={control}
          defaultValue=""
        />
      </div>

      <FormField
        render={({ field }) => (
          <FormItem className="w-38">
            <FormLabel>Status</FormLabel>
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="finisher">Finisher</SelectItem>
                <SelectItem value="DNF">DNF</SelectItem>
                <SelectItem value="DNS">DNS</SelectItem>
                <SelectItem value="DNQ">DNQ</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage>{errors.status?.message}</FormMessage>
          </FormItem>
        )}
        name="status"
        control={control}
        defaultValue=""
      />

      <div className="flex gap-2">
        <Button type="submit" variant="secondary" disabled={isLoading}>
          Submit
        </Button>
        <Button type="button" variant="outline" onClick={saveDraft} disabled={isLoading}>
          Sauvegarder brouillon
        </Button>
      </div>

      {status && (
        <Alert variant="destructive">
          <AlertDescription>{status}</AlertDescription>
        </Alert>
      )}
    </form>
  );
};

export default AddResultForm;
