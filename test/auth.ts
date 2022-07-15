import { HttpStatus } from '@nestjs/common'
import * as pactum from 'pactum'

import { AuthDto } from '~/auth/dto'

export const AuthTest = () =>
  describe('Auth module', () => {
    const dto: AuthDto = {
      email: 'titux@lgdweb.fr',
      password: 'azerty12345'
    }

    describe('Signup', () => {
      it('should throw if email empty', async () =>
        pactum
          .spec()
          .post('/auth/signup')
          .withBody({ password: dto.password })
          .expectStatus(HttpStatus.BAD_REQUEST))

      it('should throw if password empty', async () =>
        pactum
          .spec()
          .post('/auth/signup')
          .withBody({ email: dto.email })
          .expectStatus(HttpStatus.BAD_REQUEST))

      it('should throw if no body provided', async () =>
        pactum.spec().post('/auth/signup').expectStatus(HttpStatus.BAD_REQUEST))

      it('should signup', async () =>
        pactum.spec().post('/auth/signup').withBody(dto).expectStatus(HttpStatus.CREATED))

      it('should throw if email already taken', async () =>
        pactum.spec().post('/auth/signup').withBody(dto).expectStatus(HttpStatus.FORBIDDEN))
    })
    describe('Signin', () => {
      it('should throw if email empty', async () =>
        pactum
          .spec()
          .post('/auth/signin')
          .withBody({ password: dto.password })
          .expectStatus(HttpStatus.BAD_REQUEST))

      it('should throw if password empty', async () =>
        pactum
          .spec()
          .post('/auth/signin')
          .withBody({ email: dto.email })
          .expectStatus(HttpStatus.BAD_REQUEST))

      it('should throw if no body provided', async () =>
        pactum.spec().post('/auth/signin').expectStatus(HttpStatus.BAD_REQUEST))

      it('should signup', async () =>
        pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(HttpStatus.OK)
          .stores('userAccessToken', 'accessToken'))
    })
  })
