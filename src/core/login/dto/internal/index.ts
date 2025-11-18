export interface LoginParams {
  email: string;
  password: string;
}

export interface CreateLoginParams {
  token: string;
  userId: string;
}

export interface UpdateLoginParams {
  id?: string;
  token: string;
  userId: string;
}
