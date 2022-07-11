import { Module } from '@nestjs/common'

import { AuthModule } from '~/auth'
import { PrismaModule } from '~/prisma'

@Module({
  imports: [AuthModule, PrismaModule]
})
export class AppModule {}
