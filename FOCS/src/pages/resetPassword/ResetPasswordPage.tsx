import { useSearchParams } from "react-router-dom";
import ResetPasswordForm from "../../components/auth/ResetPasswordForm/ResetPasswordForm";
import { useResetPassword } from "../../hooks/useResetPassword";

const ResetPasswordPage = () => {
  const { onSubmit, error, isPending } = useResetPassword();
  const [searchParams] = useSearchParams();
  const emailFromUrl = searchParams.get("email");
  const tokenFromUrl = searchParams.get("token");
  const onFinish = (data: {
    new_password: string;
    confirm_password: string;
  }) => {
    onSubmit({
      confirm_password: data.confirm_password,
      new_password: data.new_password,
      email: emailFromUrl as string,
      token: tokenFromUrl,
    });
  };
  return (
    <ResetPasswordForm
      isPending={isPending}
      error={error}
      onFinish={onFinish}
      email={emailFromUrl as string}
    />
  );
};

export default ResetPasswordPage;
