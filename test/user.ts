import { HttpStatus } from '@nestjs/common'
import * as pactum from 'pactum'

export const UserTest = () =>
  describe('User module', () => {
    describe('Get me', () => {
      it('should throw if no token provided', async () =>
        pactum.spec().get('/users/me').expectStatus(HttpStatus.UNAUTHORIZED))

      it('should throw if invalid token provided', async () =>
        pactum
          .spec()
          .get('/users/me')
          .withHeaders({ Authorization: 'Bearer azerty123' })
          .expectStatus(HttpStatus.UNAUTHORIZED))

      it('should get current user', async () =>
        pactum
          .spec()
          .get('/users/me')
          .withHeaders({ Authorization: 'Bearer $S{userAccessToken}' })
          .expectStatus(HttpStatus.OK))
    })
  })
