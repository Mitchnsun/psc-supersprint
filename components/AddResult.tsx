import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import TimeField from 'react-simple-timefield';
import { push, ref, set } from 'firebase/database';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Box, Button, MenuItem, Stack, TextField } from '@mui/material';
import db from '../lib/firebase';
import { schema } from '../utils/results';
import { CAT, CATEGORIES, categoryFromBirthYear } from '../utils/categories.utils';

type FormValues = {
  bib: string;
  birthYear: string;
  category: CAT;
  firstname: string;
  gender: string;
  lastname: string;
  times: { swim: string; bike: string; total: string };
};

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

  return { swim: swimSeconds, bike: bikeSeconds, run: totalSeconds - swimSeconds - bikeSeconds, total: totalSeconds };
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
  });

  const birthYear = watch('birthYear');

  useEffect(() => {
    const category = categoryFromBirthYear(parseInt(birthYear, 10)) || CATEGORIES[1];
    setValue('category', category.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [birthYear]);

  const onSubmit = async ({ firstname, lastname, bib, gender, category, times }: FormValues) => {
    setIsLoading(true);
    const { key } = await push(ref(db, 'results'));
    set(ref(db, `results/${key}`), { firstname, lastname, bib, sex: gender, cat: category, ...timeCalculus(times) })
      .then(() => reset())
      .catch((error) => setStatus(error.message))
      .finally(() => setIsLoading(false));
  };

  return (
    <Box component="form" autoComplete="off" onSubmit={handleSubmit(onSubmit)} sx={{ padding: '1rem' }}>
      <Stack spacing={2}>
        <Controller
          render={({ field }) => (
            <TextField
              {...field}
              label="Numéro de dossard"
              size="small"
              error={!!errors.bib?.message}
              helperText={errors.bib?.message}
            />
          )}
          name="bib"
          control={control}
          defaultValue=""
        />
        <Stack direction="row" spacing={2}>
          <Controller
            render={({ field }) => (
              <TextField
                {...field}
                label="Nom"
                size="small"
                error={!!errors.lastname?.message}
                helperText={errors.lastname?.message}
              />
            )}
            name="lastname"
            control={control}
            defaultValue=""
          />
          <Controller
            render={({ field }) => (
              <TextField
                {...field}
                label="Prénom"
                size="small"
                error={!!errors.firstname?.message}
                helperText={errors.firstname?.message}
              />
            )}
            name="firstname"
            control={control}
            defaultValue=""
          />
        </Stack>
        <Controller
          render={({ field }) => (
            <TextField
              {...field}
              label="Gender"
              size="small"
              select
              error={!!errors.gender?.message}
              helperText={errors.gender?.message}
              style={{ width: 150 }}
            >
              <MenuItem value="M">Homme (M)</MenuItem>
              <MenuItem value="F">Femme (F)</MenuItem>
            </TextField>
          )}
          name="gender"
          control={control}
          defaultValue=""
        />
        <Stack direction="row" spacing={2}>
          <Controller
            render={({ field }) => (
              <TextField
                {...field}
                label="Année de naissance"
                size="small"
                error={!!errors.birthYear?.message}
                helperText={errors.birthYear?.message}
                inputProps={{ maxLength: 4 }}
              />
            )}
            name="birthYear"
            control={control}
            defaultValue=""
          />
          <Controller
            render={({ field }) => (
              <TextField
                {...field}
                label="Catégorie"
                size="small"
                select
                error={!!errors.category?.message}
                helperText={errors.category?.message}
                style={{ width: 150 }}
              >
                {CATEGORIES.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.label} ({cat.id})
                  </MenuItem>
                ))}
              </TextField>
            )}
            name="category"
            control={control}
            defaultValue={CATEGORIES[1].id}
          />
        </Stack>
        <Stack direction="row" spacing={2}>
          <Controller
            render={({ field }) => (
              <TimeField
                {...field}
                showSeconds
                style={{ width: 150 }}
                input={
                  <TextField
                    label="Swim"
                    size="small"
                    variant="outlined"
                    error={!!errors.times?.swim?.message}
                    helperText={errors.times?.swim?.message}
                  />
                }
              />
            )}
            name="times.swim"
            control={control}
            defaultValue=""
          />
          <Controller
            render={({ field }) => (
              <TimeField
                {...field}
                showSeconds
                style={{ width: 150 }}
                input={
                  <TextField
                    label="Bike"
                    size="small"
                    variant="outlined"
                    error={!!errors.times?.bike?.message}
                    helperText={errors.times?.bike?.message}
                  />
                }
              />
            )}
            name="times.bike"
            control={control}
            defaultValue=""
          />
          <Controller
            render={({ field }) => (
              <TimeField
                {...field}
                showSeconds
                style={{ width: 150 }}
                input={
                  <TextField
                    label="Total"
                    size="small"
                    variant="outlined"
                    error={!!errors.times?.total?.message}
                    helperText={errors.times?.total?.message}
                  />
                }
              />
            )}
            name="times.total"
            control={control}
            defaultValue=""
          />
        </Stack>
        <Button type="submit" variant="contained" color="secondary" disabled={isLoading}>
          Submit
        </Button>
      </Stack>
      {status && <Alert severity="error">{status}</Alert>}
    </Box>
  );
};

export default AddResultForm;
