import axiosInstance from '../config/axios';
import axiosClient from '../config/axiosClient';

interface RegistrationParamsItf {
  email: string;
  username: string;
  password: string;
  role: string;
}

const registrationAccount = ({
  email,
  username,
  password,
  role,
}: RegistrationParamsItf) => {
  const url = 'auth/register';
  return axiosClient.post(url, {
    email,
    username,
    password,
    role,
  });
};

const getListRoleAccount = () => {
  const url = 'auth/role';
  return axiosClient.get(url);
};

const verifyAccount = ({ token }: { token: string | undefined }) => {
  const url = `auth/verify/${token}`;
  return axiosClient.post(url);
};

const resendVerifyAccount = ({ email }: { email: string }) => {
  const url = `auth/resend-verification-email`;
  return axiosClient.post(url, { email });
};

const loginAccount = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const url = `auth/login`;
  return axiosClient.post(url, { email, password });
};

const loginWidthGoogle = ({ authCode }: { authCode: string }) => {
  const url = `google?code=${authCode}`;
  return axiosInstance.post(url);
};

const loginWidthFacebook = ({ authCode }: { authCode: string }) => {
  const url = `facebook?code=${authCode}`;
  return axiosInstance.post(url);
};

const forgotPassword = ({ email }: { email: string }) => {
  const url = `auth/forgot-password`;
  return axiosClient.post(url, { email });
};

const resetPassword = ({
  token,
  password,
}: {
  token: string | undefined;
  password: string;
}) => {
  const url = `auth/change-password`;
  return axiosClient.put(url, { token, password });
};

export {
  registrationAccount,
  getListRoleAccount,
  verifyAccount,
  resendVerifyAccount,
  loginAccount,
  loginWidthGoogle,
  loginWidthFacebook,
  forgotPassword,
  resetPassword,
};
