import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from '@tanstack/react-query';
import { useForm } from "react-hook-form";
import { toast } from 'react-hot-toast';
import { z } from "zod";

import { useAuth } from "../../../app/hooks/useAuth";
import { authService } from "../../../app/services/authService";
import { SignupParams } from "../../../app/services/authService/signup";
import { useCallback, useState } from "react";

const schema = z.object({
  name: z.string().nonempty('Name is required'),
  email: z.string()
    .nonempty('E-mail is required')
    .email('Please provide a valid e-mail'),
  password: z.string()
    .nonempty('Password is required')
    .min(8, 'Password must be at least 8 characters long'),
});

type FormData = z.infer<typeof schema>;

export function useRegisterController() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    handleSubmit: hookFormSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (data: SignupParams) => {
      return authService.signup(data);
    },
  });

  const { signin } = useAuth();

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      const { accessToken } = await mutateAsync(data);

      signin(accessToken);
    } catch {
      toast.error('An error occurred while creating your account!')
    }
  });

  const toggleValuesVisibility = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    setShowPassword(prevState => !prevState);
  }, []);

  return { register, errors, handleSubmit, isLoading, toggleValuesVisibility, showPassword };
}
