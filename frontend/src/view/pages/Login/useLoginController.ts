import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { z } from 'zod';
import { useAuth } from '../../../app/hooks/useAuth';
import { authService } from '../../../app/services/authService';
import { SigninParams } from '../../../app/services/authService/signin';
import { useCallback, useState } from 'react';

const schema = z.object({
  email: z.string()
    .nonempty('E-mail is required')
    .email('Please provide a valid e-mail'),
  password: z.string()
    .nonempty('Password is required')
    .min(8, 'Password must be at least 8 characters long'),
});

type FormData = z.infer<typeof schema>;

export function useLoginController() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (data: SigninParams) => {
      return authService.signin(data);
    },
  });

  const { signin } = useAuth();

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      const { accessToken } = await mutateAsync(data);

      signin(accessToken);
    } catch {
      toast.error('Invalid credentials!')
    }
  });

  const toggleValuesVisibility = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    setShowPassword(prevState => !prevState);
  }, []);

  return { handleSubmit, register, errors, isLoading, toggleValuesVisibility, showPassword };
}
