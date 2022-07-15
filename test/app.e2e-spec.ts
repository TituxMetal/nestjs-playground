import { INestApplication, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Test } from '@nestjs/testing'
import * as pactum from 'pactum'

import { AppModule } from '~/app.module'
import { PrismaService } from '~/prisma/prisma.service'

import { AuthTest } from './auth'
import { UserTest } from './user'

describe('End To End Test', () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile()
    app = moduleRef.createNestApplication()

    const configService = app.get(ConfigService)
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
    await app.listen(configService.get('PORT'))
    prisma = app.get(PrismaService)
    prisma.enableShutdownHooks(app)

    pactum.request.setBaseUrl(`http://localhost:${configService.get('PORT')}`)
  })

  afterAll(async () => {
    await prisma.cleanDb()
    await app.close()
  })

  AuthTest()
  UserTest()
})
