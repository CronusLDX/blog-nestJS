import { v4 as uuidv4 } from 'uuid';
interface LoginProps {
  id?: string;
  hashedToken: string;
  userId: string;
  revoked: boolean;
  expiresAt: Date;
  createdAt?: Date;
}

export class LoginEntity {
  readonly id: string;
  private _hashedToken: string;
  private _userId: string;
  private _revoked: boolean;
  private _expiresAt: Date;
  private _createdAt?: Date;

  protected constructor(props: LoginProps) {
    this.id = props.id ?? uuidv4();
    this._hashedToken = props.hashedToken;
    this._userId = props.userId;
    this._revoked = props.revoked;
    this._expiresAt = props.expiresAt;
    this._createdAt = props.createdAt || new Date();
  }

  get hashedToken(): string {
    return this._hashedToken;
  }

  get userId(): string {
    return this._userId;
  }

  get revoked(): boolean {
    return this._revoked;
  }

  get expiresAt(): Date {
    return this._expiresAt;
  }

  get createdAt(): Date | undefined {
    return this._createdAt;
  }

  public static create(props: Omit<LoginProps, 'id' | 'createdAt'>) {
    return new LoginEntity({
      hashedToken: props.hashedToken,
      userId: props.userId,
      revoked: props.revoked,
      expiresAt: props.expiresAt,
    });
  }

  public static restore(props: LoginProps): LoginEntity {
    return new LoginEntity(props);
  }

  changeHashedToken(hashedToken: string): void {
    this._hashedToken = hashedToken;
  }
  changeExpiresAt(expiresAt: Date): void {
    this._expiresAt = expiresAt;
  }

  changeRevoked(revoked: boolean): void {
    this._revoked = revoked;
  }

  public export(): object {
    return {
      id: this.id,
      hashedToken: this.hashedToken,
      userId: this.userId,
      revoked: this.revoked,
      expiresAt: this.expiresAt,
      createdAt: this.createdAt,
    };
  }
}
