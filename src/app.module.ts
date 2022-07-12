import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AuthModule } from '~/auth'
import { PrismaModule } from '~/prisma'

@Module({
  imports: [AuthModule, ConfigModule.forRoot({ isGlobal: true, cache: true }), PrismaModule]
})
export class AppModule {}
