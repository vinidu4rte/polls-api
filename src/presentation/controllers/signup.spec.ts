import { InvalidParamError } from '../errors/invalid-param-error'
import { MissingParamError } from '../errors/missing-param-error'
import { SignUpController } from './signup'

describe('SignUpController', () => {
  test('Ensure return 400 if no name is provided', () => {
    const sut = new SignUpController()

    const httpRequest = {
      body: {
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password_confirmation'
      }
    }

    const response = sut.handle(httpRequest)
    const { statusCode, body } = response

    expect(statusCode).toBe(400)
    expect(body).toEqual(new MissingParamError('name'))
  })

  test('Ensure return 400 if no email is provided', () => {
    const sut = new SignUpController()

    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password_confirmation'
      }
    }

    const response = sut.handle(httpRequest)
    const { statusCode, body } = response

    expect(statusCode).toBe(400)
    expect(body).toEqual(new MissingParamError('email'))
  })

  test('Ensure return 400 if no password is provided', () => {
    const sut = new SignUpController()

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        passwordConfirmation: 'any_password_confirmation'
      }
    }

    const response = sut.handle(httpRequest)
    const { statusCode, body } = response

    expect(statusCode).toBe(400)
    expect(body).toEqual(new MissingParamError('password'))
  })

  test('Ensure return 400 if no password is provided', () => {
    const sut = new SignUpController()

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password'
      }
    }

    const response = sut.handle(httpRequest)
    const { statusCode, body } = response

    expect(statusCode).toBe(400)
    expect(body).toEqual(new MissingParamError('passwordConfirmation'))
  })

  test('Ensure return 400 if email provided is not valid', () => {
    const sut = new SignUpController()

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    const response = sut.handle(httpRequest)
    const { statusCode, body } = response

    expect(statusCode).toBe(400)
    expect(body).toEqual(new InvalidParamError('email'))
  })
})
