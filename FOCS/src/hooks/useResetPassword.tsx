import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { message } from "antd";
import { resetPassword } from "../services/authService";

interface PasswordData {
  new_password: string;
  confirm_password: string;
}

interface UseResetPasswordProps {
  email: string;
  token: string | null;
}

export const useResetPassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      message.success(t("reset_password.reset_success"));
      navigate("/login");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => {
      const message = err.response?.data?.message || t("error_generic");
      setError(message);
    },
  });

  const onSubmit = (data: UseResetPasswordProps & PasswordData) => {
    setError(null);
    mutate(data);
  };

  return { onSubmit, isPending, isSuccess, error };
};
