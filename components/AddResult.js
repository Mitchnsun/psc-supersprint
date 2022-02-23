/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../utils/results';

const AddResultForm = () => {
  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const onSubmit = data => axios.post('/api/result', data).then(res => console.log('res', res));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("bib")} />
      <p>{errors.bib?.message}</p>
      <input {...register("firstname")} />
      <p>{errors.firstname?.message}</p>
      <input {...register("lastname")} />
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
      <input {...register("times.swim")} />
      <p>{errors.times?.swim?.message}</p>
      <input {...register("times.bike")} />
      <p>{errors.times?.bike?.message}</p>
      <input {...register("times.total")} />
      <p>{errors.times?.total?.message}</p>
      <input type="submit" />
    </form>
  )
};

export default AddResultForm;
