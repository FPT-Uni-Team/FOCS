import ForgotPasswordForm from "../../components/auth/ForgotPasswordForm/ForgotPasswordForm";
import { useForgotPassword } from "../../hooks/useForgotPassword";

const ForgotPasswordPage = () => {
  const { onSubmit, isPending, isSuccess, error } = useForgotPassword();

  return (
    <ForgotPasswordForm
      onSubmit={onSubmit}
      isPending={isPending}
      isSuccess={isSuccess}
      error={error}
    />
  );
};

export default ForgotPasswordPage;
