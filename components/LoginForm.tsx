import { useState, useContext } from 'react';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <p className="text-base my-4">Vous devez être connecté pour accéder à cette page</p>

      <div className="flex gap-4 w-1/2">
        <FormField
          control={control}
          name="id"
          defaultValue=""
          render={({ field }) => (
            <FormItem className="basis-1/2">
              <FormLabel>Identifiant</FormLabel>
              <Input {...field} />
              <FormMessage>{errors.id?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="password"
          defaultValue=""
          render={({ field }) => (
            <FormItem className="basis-1/2">
              <FormLabel>Mot de passe</FormLabel>
              <Input {...field} type="password" />
              <FormMessage>{errors.password?.message}</FormMessage>
            </FormItem>
          )}
        />
      </div>

      <div className="py-4">
        <Button type="submit" variant="secondary">
          Se connecter
        </Button>
      </div>

      {firebaseMsg && (
        <Alert variant="destructive">
          <AlertDescription>{firebaseMsg}</AlertDescription>
        </Alert>
      )}
    </form>
  );
};

export default LoginForm;
