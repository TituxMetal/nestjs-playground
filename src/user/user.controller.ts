import { Controller, Get, UseGuards } from '@nestjs/common'
import { User } from '@prisma/client'

import { GetUser, JwtGuard } from '~/auth'

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  @Get('me')
  async getMe(@GetUser() user: User) {
    return { data: user }
  }
}
