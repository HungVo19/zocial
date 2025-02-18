import axiosClient from '../config/axiosClient';

export interface GetListAccountUserItf {
  keyword?: string;
  username?: string;
  role?: string;
  activeStatus?: string;
  email?: string;
  phoneNumber?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: string;
  sortDirection?: string;
  startDate?: string;
  endDate?: string;
}

export interface CreateAccountUserItf {
  email?: string;
  username?: string;
  birthdate?: string;
  phoneNumber?: string;
  gender?: string;
  nationality?: string;
  role?: string;
}

export interface ExpostFile {
  searchFilterRequest?: {};
  ids?: String[];
}

const getListAccountUser = (payload: GetListAccountUserItf) => {
  const url = 'user-service/public/users';
  return axiosClient.post(url, payload);
};

const getListRole = () => {
  const url = 'user-service/public/user-roles';
  return axiosClient.get(url);
};

const getListStatusUser = () => {
  const url = 'user-service/public/user-status';
  return axiosClient.get(url);
};

const deleteUsers = (listId: never[]) => {
  const url = 'user-service/public/users';
  return axiosClient.delete(url, { data: { ids: listId } });
};

const exportFile = (payload: ExpostFile) => {
  const url = 'user-service/public/users/export';
  return axiosClient.post(url, payload, { responseType: 'blob' });
};

const getListNation = () => {
  const url = 'user-service/public/nationality';
  return axiosClient.get(url);
};

const getListGender = () => {
  const url = 'user-service/public/gender';
  return axiosClient.get(url);
};

const createAccountUser = (payload: CreateAccountUserItf) => {
  const url = 'user-service/public/users/create';
  return axiosClient.post(url, payload);
};

export {
  getListAccountUser,
  getListRole,
  getListStatusUser,
  deleteUsers,
  exportFile,
  getListNation,
  getListGender,
  createAccountUser,
};
