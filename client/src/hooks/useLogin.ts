
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { LoginFormData, loginSchema } from "@/schemas/usersSchema";
import { loginUser } from "@/service/usersAPI";

export const useLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const user = await loginUser(data);
      if(user){
        localStorage.setItem('user',JSON.stringify(user?.userData))
        return { success: true, message:user?.message }; 
      }
    } catch (error:unknown) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
      setError(errorMessage);
      return { success: false, message: errorMessage };

    }
  };

  return {
    form: { register, handleSubmit, errors, isSubmitting },
    actions: { onSubmit, showPassword, setShowPassword },
    error,
  };
};
