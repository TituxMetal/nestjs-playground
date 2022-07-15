import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AuthModule } from '~/auth'
import { PrismaModule } from '~/prisma'
import { UserModule } from '~/user'

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    UserModule,
    PrismaModule
  ],
  controllers: []
})
export class AppModule {}
