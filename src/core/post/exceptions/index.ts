export class ModelNotFoundException extends Error {
  constructor(message: string) {
    super(message);
  }
}
export class ModelAlreadyExistsException extends Error {
  constructor(message: string) {
    super(message);
  }
}
