import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { showNotification } from "../components/common/notification/ToastCustom";
import { useState } from "react";
import { forgotPassword } from "../services/authService";

interface ForgotPasswordData {
  email: string;
}

export const useForgotPassword = () => {
  const { t } = useTranslation();
  const [error, setError] = useState<string | null>(null);

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      showNotification("success", t("notification.forgotPasswordSuccess"));
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => {
      const message = err.response?.data?.message || t("error_generic");
      showNotification("error", message);
      setError(message);
    },
  });

  const onSubmit = (data: ForgotPasswordData) => {
    mutate(data);
  };

  return {
    onSubmit,
    isPending,
    isSuccess,
    error,
  };
};
