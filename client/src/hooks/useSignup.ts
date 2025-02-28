
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SignupFormData, signupSchema } from "@/schemas/usersSchema";
import { signupUser } from "@/service/usersAPI";

export const useSignup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  
  const onSubmit = async (data: SignupFormData):Promise<SubmitResponse> => {
    try {
      const user = await signupUser(data);
      return { success: true, message: user?.message }; 
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
