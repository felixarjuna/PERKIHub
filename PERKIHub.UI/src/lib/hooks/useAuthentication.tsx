import { useMutation, useQueryClient } from '@tanstack/react-query';
import { register, signIn } from '../api/api';

export const useAuthentication = () => {
  const queryClient = useQueryClient();

  const onSignIn = useMutation(signIn, {
    onSuccess: () => {
      queryClient.invalidateQueries(['auth']);
    },
  });

  const onRegister = useMutation(register, {
    onSuccess: () => {
      queryClient.invalidateQueries(['auth']);
    },
  });

  return { onSignIn, onRegister };
};
