import { Injectable } from '@nestjs/common'

import { PrismaService } from '~/prisma/prisma.service'

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup() {
    return { message: 'I am signup' }
  }

  async signin() {
    return { message: 'I am signin' }
  }
}
