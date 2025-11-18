export interface CreateUserParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  bio?: string;
  profilePictureUrl?: string;
}

export interface UpdateUserParams {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  bio?: string;
  profilePictureUrl?: string;
}
