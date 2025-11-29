/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWTInvalidException } from '../../exceptions';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new JWTInvalidException('JWT_SECRET is not defined');
    }
    super({
      // Pega o token do header: "Authorization: Bearer <token>"
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret, // Deve ser a mesma chave usada no Login
    });
  }

  // O "payload" é o JSON que estava criptografado dentro do token
  validate(payload: any) {
    // O retorno daqui é injetado automaticamente em "request.user"
    return { userId: payload.sub };
  }
}
