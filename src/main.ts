import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'

import { AppModule } from '~/app.module'
import { PrismaService } from '~/prisma'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))

  const prismaService = app.get(PrismaService)
  await prismaService.enableShutdownHooks(app)

  const configService = app.get(ConfigService)
  await app.listen(configService.get('PORT'))
}
bootstrap()
