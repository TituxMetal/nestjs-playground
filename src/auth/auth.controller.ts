import { Controller, HttpCode, Post } from '@nestjs/common'

import { AuthService } from '~/auth/auth.service'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @HttpCode(200)
  signup() {
    return this.authService.signup()
  }

  @Post('signin')
  @HttpCode(200)
  signin() {
    return this.authService.signin()
  }
}
