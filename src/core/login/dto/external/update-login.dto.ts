import { UpdateLoginParams } from '../internal';

export class UpdateLoginDTO implements Omit<UpdateLoginParams, 'id'> {
  token: string;
  userId: string;
}
