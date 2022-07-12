import { ForbiddenException, Injectable } from '@nestjs/common'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import * as argon from 'argon2'

import { PrismaService } from '~/prisma/prisma.service'

import { AuthDto } from './dto'

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(dto: AuthDto) {
    const { email, password } = dto
    const hash = await argon.hash(password)

    try {
      const newUser = await this.prisma.user.create({
        data: { email: email, hash },
        select: {
          id: true,
          email: true,
          createdAt: true
        }
      })

      return { data: newUser }
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ForbiddenException('Credentials already taken')
      }

      throw error
    }
  }

  async signin(dto: AuthDto) {
    const { email, password } = dto
    const user = await this.prisma.user.findUnique({ where: { email } })

    if (!user) {
      throw new ForbiddenException('Invalid Credentials')
    }

    const passwordMatches = await argon.verify(user.hash, password)

    if (!passwordMatches) {
      throw new ForbiddenException('Invalid Credentials')
    }

    const { id, createdAt } = user

    return { data: { id, email, createdAt } }
  }
}
