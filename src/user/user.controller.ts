import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { Request } from 'express'

import { JwtGuard } from '~/auth/guard'

@Controller('users')
export class UserController {
  @UseGuards(JwtGuard)
  @Get('me')
  async getMe(@Req() req: Request) {
    return { data: req.user }
  }
}
