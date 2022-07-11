import { Injectable } from '@nestjs/common'

@Injectable()
export class AuthService {
  async signup() {
    return { message: 'I am signup' }
  }

  async signin() {
    return { message: 'I am signin' }
  }
}
