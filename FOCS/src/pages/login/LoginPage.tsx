import { useMutation } from "@tanstack/react-query";
import { login } from "../../services/authService";
import LoginForm from "../../components/auth/LoginForm/LoginForm";
import { useForm } from "antd/es/form/Form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const LoginPage = () => {
  const { setTokens } = useAuth();
  const [form] = useForm();
  const navigate = useNavigate();

  const {
    mutate: loginMutate,
    isPending,
    error,
  } = useMutation({
    mutationFn: login,
    onSuccess: (res) => {
      const { access_token, refresh_token } = res.data;
      setTokens(access_token, refresh_token);
      navigate("/");
    },
    onError: (err) => {
      console.error("Login failed:", err);
    },
  });

  const handleSubmit = () => {
    const { email, password } = form.getFieldsValue();
    loginMutate({ email, password });
  };

  return (
    <LoginForm
      form={form}
      loading={isPending}
      error={
        error ? (error instanceof Error ? error.message : String(error)) : null
      }
      onSubmit={handleSubmit}
    />
  );
};

export default LoginPage;
