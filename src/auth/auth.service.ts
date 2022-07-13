import { ForbiddenException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import * as argon from 'argon2'

import { PrismaService } from '~/prisma/prisma.service'

import { AuthDto } from './dto'

@Injectable()
export class AuthService {
  constructor(
    private config: ConfigService,
    private prisma: PrismaService,
    private jwt: JwtService
  ) {}

  async signup(dto: AuthDto) {
    const { email, password } = dto
    const hash = await argon.hash(password)

    try {
      const { id, email: userEmail } = await this.prisma.user.create({
        data: { email: email, hash },
        select: { id: true, email: true }
      })

      return this.signToken(id, userEmail)
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ForbiddenException('Credentials already taken')
      }

      throw error
    }
  }

  async signin(dto: AuthDto) {
    const { email, password } = dto
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true, hash: true }
    })

    if (!user) {
      throw new ForbiddenException('Invalid Credentials')
    }

    const passwordMatches = await argon.verify(user.hash, password)

    if (!passwordMatches) {
      throw new ForbiddenException('Invalid Credentials')
    }

    return this.signToken(user.id, user.email)
  }

  async signToken(userId: string, email: string): Promise<{ accessToken: string }> {
    const payload = {
      sub: userId,
      email
    }

    const secret = this.config.getOrThrow('JWT_SECRET')

    const accessToken = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret
    })
    return { accessToken }
  }
}
