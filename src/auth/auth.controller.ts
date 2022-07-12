import { Body, Controller, HttpCode, Post } from '@nestjs/common'

import { AuthService } from '~/auth/auth.service'

import { AuthDto } from './dto'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @HttpCode(200)
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto)
  }

  @Post('signin')
  @HttpCode(200)
  signin() {
    return this.authService.signin()
  }
}
