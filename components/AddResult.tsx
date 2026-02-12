import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { push, ref, set } from 'firebase/database';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import * as yup from 'yup';
import db from '@/lib/firebase';
import Time from '@/utils/time';
import { schema } from '@/utils/results';
import { CATEGORIES, categoryFromBirthYear } from '@/utils/categories.utils';
import { YEAR } from '@/utils/constants';

type FormValues = yup.InferType<typeof schema>;

const timeCalculus = ({ swim, bike, total }: { swim: string; bike: string; total: string }) => {
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

const AddResultForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const {
    control,
    reset,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      bib: '' as any,
      lastname: '',
      firstname: '',
      gender: '',
      birthYear: '' as any,
      category: CATEGORIES[1].id,
      status: 'finisher',
      times: {
        swim: '',
        bike: '',
        total: '',
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

  const onSubmit = async ({ firstname, lastname, bib, gender, category, status: raceStatus, times }: FormValues) => {
    setIsLoading(true);
    const { key } = await push(ref(db, YEAR.toString()));
    set(ref(db, `${YEAR}/${key}`), {
      firstname,
      lastname,
      bib,
      sex: gender,
      status: raceStatus === 'finisher' ? '' : raceStatus,
      cat: category,
      ...timeCalculus(times),
    })
      .then(() => reset())
      .catch((error) => setStatus(error.message))
      .finally(() => setIsLoading(false));
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
      <FormField
        render={({ field }) => (
          <FormItem>
            <FormLabel>Numéro de dossard</FormLabel>
            <Input {...field} />
            <FormMessage>{errors.bib?.message}</FormMessage>
          </FormItem>
        )}
        name="bib"
        control={control}
      />

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
              <Input {...field} maxLength={4} />
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

      <Button type="submit" variant="secondary" disabled={isLoading}>
        Submit
      </Button>

      {status && (
        <Alert variant="destructive">
          <AlertDescription>{status}</AlertDescription>
        </Alert>
      )}
    </form>
  );
};

export default AddResultForm;
