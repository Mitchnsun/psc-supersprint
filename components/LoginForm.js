/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useContext } from 'react';
import * as yup from 'yup';
import { initializeApp } from 'firebase/app'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseConfig } from '../lib/firebase';
import UserContext from '../utils/context/user.context';

initializeApp(firebaseConfig)

const schema = yup.object({
  id: yup.string().required(),
  password: yup.string().required(),
})
const LoginForm = () => {
  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const auth = getAuth();
  const { setUser } = useContext(UserContext)
  const [firebaseMsg, setFirebaseMsg] = useState(null);

  const onSubmit = ({ id, password }) => signInWithEmailAndPassword(auth, id, password)
    .then(userCredential => setUser({ uid: userCredential.user.uid, isLoggedIn: true }))
    .catch(() => setFirebaseMsg('Identifiants incorrects'));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p>Vous devez être connecté pour accéder à cette page</p>
      <input type="text" placeholder="Identifiant" {...register("id")} />
      <input type="password" placeholder="Mot de passe" {...register("password")} />
      <input type="submit" value="Se connecter" />
      <p>{errors.id?.message}</p>
      <p>{errors.password?.message}</p>
      <p>{firebaseMsg}</p>
    </form>
  );
};

export default LoginForm;
