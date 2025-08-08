import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { showNotification } from "../components/common/notification/ToastCustom";
import { SignUp } from "../services/authService";
import { useTranslation } from "react-i18next";

export const useRegister = () => {
  const { t } = useTranslation();
  const [error, setError] = useState<string | null>(null);

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: SignUp,
    onSuccess: () => {
      showNotification("success", t("notification.signUpSuccess"));
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => {
      const message =
        err.response?.data?.message || t("notification.signUpFailed");
      setError(message);
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    setError(null);
    mutate(data);
  };

  return {
    onSubmit,
    isPending,
    isSuccess,
    error,
  };
};
