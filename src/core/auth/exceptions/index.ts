import { HttpException, HttpStatus } from '@nestjs/common';

export class JWTInvalidException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}
