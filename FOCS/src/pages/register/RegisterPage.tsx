import RegisterForm from "../../components/auth/RegisterForm/RegisterForm";
import { useRegister } from "../../hooks/useRegister";

const RegisterPage = () => {
  const { onSubmit, isPending, isSuccess, error } = useRegister();

  return (
    <RegisterForm
      isPending={isPending}
      isSuccess={isSuccess}
      error={error}
      onFinish={onSubmit}
    />
  );
};

export default RegisterPage;
