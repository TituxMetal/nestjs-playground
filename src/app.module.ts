import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AuthModule } from '~/auth'
import { PrismaModule } from '~/prisma'
import { UserController } from '~/user'

@Module({
  imports: [AuthModule, ConfigModule.forRoot({ isGlobal: true, cache: true }), PrismaModule],
  controllers: [UserController]
})
export class AppModule {}
