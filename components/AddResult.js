/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import TimeField from 'react-simple-timefield'
import { yupResolver } from '@hookform/resolvers/yup';
import { push, ref, set } from "firebase/database";
import db from '../lib/firebase';
import { schema } from '../utils/results';

const timeCalculus = ({ swim, bike, total }) => {
  const swimSeconds = swim.split(':').reverse().reduce((acc, val, index) => acc + (val * 60**index), 0);
  const bikeSeconds = bike.split(':').reverse().reduce((acc, val, index) => acc + (val * 60**index), 0);
  const totalSeconds = total.split(':').reverse().reduce((acc, val, index) => acc + (val * 60**index), 0);

  return { swim: swimSeconds, bike: bikeSeconds, run: totalSeconds - swimSeconds - bikeSeconds, total: totalSeconds };
}

const AddResultForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const { control, register, reset, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async ({ firstname, lastname, bib, gender, category, times }) => {
    setIsLoading(true);
    const { key } = await push(ref(db, 'results'))
    set(ref(db, `results/${key}`), { firstname, lastname, bib, sex: gender, cat: category, ...timeCalculus(times)})
      .then(() => reset())
      .catch(error => setStatus(error.message))
      .finally(() => setIsLoading(false))
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <input {...register("bib")} placeholder="Numéro de dossard" />
      <p>{errors.bib?.message}</p>
      <input {...register("firstname")} placeholder="Prénom" />
      <p>{errors.firstname?.message}</p>
      <input {...register("lastname")} placeholder="Nom" />
      <p>{errors.lastname?.message}</p>
      <select {...register("gender")}>
        <option value="M">Homme (M)</option>
        <option value="F">Homme (F)</option>
      </select>
      <p>{errors.gender?.message}</p>
      <select {...register("category")}>
        <option value="V">Vétéran (V)</option>
        <option value="S">Senior (S)</option>
        <option value="J">Junior (J)</option>
        <option value="C">Cadet (C)</option>
        <option value="M">Minime (M)</option>
        <option value="Benjamin">Benjamin (B)</option>
      </select>
      <p>{errors.category?.message}</p>
      <Controller
        render={({ field }) => <TimeField {...field} placeholder="Natation" showSeconds style={{ width: "65px" }} />}
        name="times.swim"
        control={control}
        defaultValue=""
      />
      <p>{errors.times?.swim?.message}</p>
      <Controller
        render={({ field }) => <TimeField {...field} placeholder="Vélo" showSeconds style={{ width: "65px" }} />}
        name="times.bike"
        control={control}
        defaultValue=""
      />
      <p>{errors.times?.bike?.message}</p>
      <Controller
        render={({ field }) => <TimeField {...field} placeholder="Total" showSeconds style={{ width: "65px" }} />}
        name="times.total"
        control={control}
        defaultValue=""
      />
      <p>{errors.times?.total?.message}</p>
      <input type="submit" disabled={isLoading} />
      <p>{status}</p>
    </form>
  )
};

export default AddResultForm;
