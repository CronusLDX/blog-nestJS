import { v4 as uuidv4 } from 'uuid';

interface UserProps {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  bio: string;
  profilePictureUrl: string;
  crearedAt?: Date;
  updatedAt?: Date;
}

export class UserEntity {
  readonly id?: string;
  private _firstName: string;
  private _lastName: string;
  private _email: string;
  private _password: string;
  private _bio: string;
  private _profilePictureUrl: string;
  private _crearedAt?: Date;
  private _updatedAt?: Date;
  protected constructor(props: UserProps) {
    this.id = props.id || uuidv4();
    this._firstName = props.firstName;
    this._lastName = props.lastName;
    this._email = props.email;
    this._password = props.password;
    this._bio = props.bio;
    this._profilePictureUrl = props.profilePictureUrl;
    this._crearedAt = props.crearedAt || new Date();
    this._updatedAt = props.updatedAt || new Date();
  }

  get firstName(): string {
    return this._firstName;
  }

  get lastName(): string {
    return this._lastName;
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }

  get bio(): string {
    return this._bio;
  }

  get profilePictureUrl(): string {
    return this._profilePictureUrl;
  }

  get crearedAt() {
    return this._crearedAt;
  }

  get updatedAt() {
    return this._updatedAt;
  }

  changeFirstName(firstName: string) {
    this._firstName = firstName;
  }

  changeLastName(lastName: string) {
    this._lastName = lastName;
  }
  changePassword(password: string) {
    const oldPassword = this._password;
    try {
      this.validatePassword(password);
      this._password = password;
    } catch (error) {
      this._password = oldPassword;
      throw new Error('Ocorreu um erro ao alterar a senha: ' + error);
    }
  }
  changeEmail(email: string) {
    const oldPassword = this._email;
    try {
      this.validateEmail(email);
      this._email = email;
    } catch (error) {
      this._email = oldPassword;
      throw new Error('Ocorreu um erro ao alterar o email: ' + error);
    }
  }

  changeBio(bio: string) {
    this._bio = bio;
  }

  changeProfilePictureUrl(profilePictureUrl: string) {
    this._profilePictureUrl = profilePictureUrl;
  }

  validatePassword(password: string) {
    const regex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    if (!regex.test(password)) {
      throw new Error(
        'A senha deve conter no mínimo 8 caracteres, incluindo uma letra maiúscula, um número e um caractere especial.',
      );
    }
  }
  validateEmail(email: string) {
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regex.test(email)) {
      throw new Error('O email é inválido, por favor tente novamente.');
    }
  }
}
