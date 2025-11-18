import { CreateLoginParams } from '../internal';

export class CreateLoginDTO implements CreateLoginParams {
  token: string;
  userId: string;
}
