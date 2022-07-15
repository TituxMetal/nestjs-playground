import { Injectable } from '@nestjs/common'

import { PrismaService } from '~/prisma'

import { UpdateUserProfileDto } from './dto'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async updateProfile(userId: string, dto: UpdateUserProfileDto) {
    const { id, email, firstName, lastName } = await this.prisma.user.update({
      where: { id: userId },
      data: { ...dto }
    })

    return { id, email, firstName, lastName }
  }
}
