/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { push, ref, set } from "firebase/database";
import db from '../lib/firebase';
import { schema } from '../utils/results';

const AddResultForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const { register, reset, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const onSubmit = async ({ firstname, lastname, bib, gender, category, times }) => {
    setIsLoading(true);
    const { key } = await push(ref(db, 'results'))
    set(ref(db, `results/${key}`), { firstname, lastname, bib, sex: gender, cat: category, ...times, run: times.total - times.swim - times.bike})
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
      <input {...register("times.swim")} placeholder="Natation" />
      <p>{errors.times?.swim?.message}</p>
      <input {...register("times.bike")} placeholder="Vélo" />
      <p>{errors.times?.bike?.message}</p>
      <input {...register("times.total")} placeholder="Total" />
      <p>{errors.times?.total?.message}</p>
      <input type="submit" disabled={isLoading} />
      <p>{status}</p>
    </form>
  )
};

export default AddResultForm;
