import axiosClient from "../api/axiosClient";
import endpoints from "../api/endpoint";

type SignUpFormData = {
  email: string;
  password: string;
  confirm_password: string;
  first_name: string;
  last_name: string;
  phone: string;
};

export const login = async (data: { email: string; password: string }) => {
  return axiosClient.post(endpoints.auth.login(), data);
};

export const SignUp = async (data: SignUpFormData) => {
  return axiosClient.post(endpoints.auth.signUp(), data);
};

export const forgotPassword = async (data: { email: string }) => {
  return axiosClient.post(endpoints.auth.forgotPassword(), data);
};

export const resetPassword = async (data: {
  email: string;
  token: string | null;
  new_password: string;
  confirm_password: string;
}) => {
  return axiosClient.post(endpoints.auth.resetPassWord(), data);
};

export const callRefreshTokenApi = async () => {
  return axiosClient.post(
    endpoints.auth.refresh(),
    {},
    { withCredentials: true }
  );
};
