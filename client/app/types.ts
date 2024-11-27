import { Role } from "./enums";

export interface IChildren {
  children: React.ReactNode;
}

export interface IUser {
  id: string;
  email: string;
  userName: string;
  roleId: string;
  status: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  deleted: boolean;
  role: any;
}

export interface IDecoded {
  id: string;
  exp: Date;
  iat: any;
  role: Role;
}

export interface IAllUsersDataResponse {
  data: IUser[];
  limit: number;
  page: number;
  total: number;
  totalPages: number;
}
export interface IAllUsersAPIResponse {
  success: boolean;
  message: string;
  payload: IAllUsersDataResponse;
}

export interface IRole {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  deleted: boolean;
}

export interface IAllRolesAPIResponse {
  success: boolean;
  message: string;
  payload: {
    roles: IRole[];
  };
}
