import { useState, useContext } from 'react';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Box, Button, TextField, Typography } from '@mui/material';
import { firebaseConfig } from '@/lib/firebase';
import UserContext from '@/utils/context/user.context';

initializeApp(firebaseConfig);

const schema = yup.object({
  id: yup.string().required(),
  password: yup.string().required(),
});
const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const auth = getAuth();
  const { setUser } = useContext(UserContext);
  const [firebaseMsg, setFirebaseMsg] = useState<string | null>(null);

  const onSubmit = ({ id, password }: { id: string; password: string }) =>
    signInWithEmailAndPassword(auth, id, password)
      .then((userCredential) => setUser({ uid: userCredential.user.uid, isLoggedIn: true }))
      .catch(() => setFirebaseMsg('Identifiants incorrects'));

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { mr: 2, width: '25ch' },
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography variant="subtitle1" style={{ margin: '1rem 0' }}>
        Vous devez être connecté pour accéder à cette page
      </Typography>
      <Controller
        render={({ field }) => (
          <TextField
            {...field}
            label="Identifiant"
            size="small"
            error={!!errors.id?.message}
            helperText={errors.id?.message}
          />
        )}
        name="id"
        control={control}
        defaultValue=""
      />
      <Controller
        render={({ field }) => (
          <TextField
            {...field}
            type="password"
            label="Mot de passe"
            size="small"
            error={!!errors.password?.message}
            helperText={errors.password?.message}
          />
        )}
        name="password"
        control={control}
        defaultValue=""
      />
      <div style={{ padding: '1rem 0' }}>
        <Button type="submit" variant="contained" color="secondary">
          Se connecter
        </Button>
      </div>
      {firebaseMsg && <Alert severity="error">{firebaseMsg}</Alert>}
    </Box>
  );
};

export default LoginForm;
