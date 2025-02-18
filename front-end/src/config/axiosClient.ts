import axios from 'axios';

export const ERROR_CODE_RESPONSE: any = {
  '400_INVALID_JWT_SIGNATURE': true,
  '400_INVALID_JWT_TOKEN': true,
  '400_JWT_TOKEN_IS_EXPIRED': true,
  '400_JWT_TOKEN_IS_UNSUPPORTED': true,
  '400_JWT_CLAIMS_STRING_IS_EMPTY': true,
  '404_ACCOUNT_HAS_BEEN_SUSPENDED_OR_UNAPPROVED': true,
  '404_ACCOUNT_NOT_EXIST': true,
  '400_ROLE_HAS_BEEN_CHANGED': true,
};

const TIME_OUT = 200000;

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: TIME_OUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosClient;

axiosClient.interceptors.request.use(
  function (config) {
    const authenticationData = localStorage.getItem('user_token');

    if (authenticationData) {
      const isTokenExpired = (token: any) => {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          return Date.now() >= payload.exp * 1000;
        } catch (error) {
          localStorage.removeItem('user_token');
          window.location.replace('/#/login');
          return true;
        }
      };

      if (isTokenExpired(authenticationData)) {
        localStorage.removeItem('user_token');
        window.location.replace('/#/login');
      } else {
        config.headers['Authorization'] = `Bearer ${authenticationData}`;
      }
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    if (error.response) {
      const errorMessage = error.response.data.message;

      if (error.response.status === 401) {
        localStorage.removeItem('user_token');
        window.location.replace('/#/login');
      } else if (error.response.status === 403) {
        window.location.replace('/#/');
      } else if (ERROR_CODE_RESPONSE[errorMessage]) {
        localStorage.removeItem('user_token');
        window.location.replace('/#/login');
      } else if (errorMessage === '410_PASSWORD_EXPIRED') {
        const userToken = localStorage.getItem('user_token');
        if (userToken) {
          const expired = {
            accessToken: JSON.parse(userToken).accessToken,
            passwordExpiredRemainingDay: 0,
          };
          localStorage.setItem('user_token', JSON.stringify(expired));
        }
        window.location.replace('/#/login');
      }
    }

    return Promise.reject(error);
  }
);
