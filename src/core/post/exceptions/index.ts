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

export class MissingRequiredField extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class ForbbidenException extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class InternalServerError extends Error {
  constructor(message: string) {
    super(message);
  }
}
