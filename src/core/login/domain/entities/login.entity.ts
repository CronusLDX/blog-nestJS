import { v4 as uuidv4 } from 'uuid';
interface LoginProps {
  id?: string;
  token: string;
  userId: string;
}

export class LoginEntity {
  readonly id: string;
  private _token: string;
  private _userId: string;

  protected constructor(props: LoginProps) {
    this.id = props.id ?? uuidv4();
    this._token = props.token;
    this._userId = props.userId;
  }

  get token(): string {
    return this._token;
  }

  get userId(): string {
    return this._userId;
  }

  public static create(
    props: Omit<LoginProps, 'id' | 'createdAt' | 'updatedAt'>,
  ) {
    return new LoginEntity(props);
  }

  public static restore(props: LoginProps): LoginEntity {
    return new LoginEntity(props);
  }

  changeToken(token: string) {
    this._token = token;
  }

  public export(): object {
    return {
      id: this.id,
      token: this.token,
      userId: this.userId,
    };
  }
}
