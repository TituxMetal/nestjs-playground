import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common'
import { User } from '@prisma/client'

import { GetUser, JwtGuard } from '~/auth'

import { UpdateUserProfileDto } from './dto'
import { UserService } from './user.service'

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  async getMe(@GetUser() user: User) {
    return { data: user }
  }

  @Patch('/')
  async updateProfile(@GetUser('id') userId: string, @Body() dto: UpdateUserProfileDto) {
    return this.userService.updateProfile(userId, dto)
  }
}
