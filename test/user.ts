import { HttpStatus } from '@nestjs/common'
import * as pactum from 'pactum'
import { like } from 'pactum-matchers'

import { UpdateUserProfileDto } from '~/user'

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

    describe('Update user profile', () => {
      const dto: UpdateUserProfileDto = {
        firstName: 'Titux',
        lastName: 'Metal',
        email: 'tituxmetal@lgdweb.fr'
      }

      it('should throw if no token provided', async () =>
        pactum.spec().patch('/users').expectStatus(HttpStatus.UNAUTHORIZED))

      it('should throw if invalid token provided', async () =>
        pactum
          .spec()
          .patch('/users')
          .withHeaders({ Authorization: 'Bearer azerty123' })
          .expectStatus(HttpStatus.UNAUTHORIZED))

      it('should update the user profile', async () =>
        pactum
          .spec()
          .patch('/users')
          .withHeaders({ Authorization: 'Bearer $S{userAccessToken}' })
          .withBody(dto)
          .expectStatus(HttpStatus.OK)
          .expectJsonMatch({ id: like('aze'), ...dto }))
    })
  })
