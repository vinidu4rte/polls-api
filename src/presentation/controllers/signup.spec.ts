import { InvalidParamError } from '../errors/invalid-param-error'
import { MissingParamError } from '../errors/missing-param-error'
import { ServerError } from '../errors/server-error'
import { type EmailValidator } from '../protocols/email-validator'
import { SignUpController } from './signup'

describe('SignUpController', () => {
  interface SutTypes {
    sut: SignUpController
    emailValidatorStub: EmailValidator
  }

  const makeSut = (): SutTypes => {
    class EmailValidatorStub {
      isValid (email: string): boolean {
        return true
      }
    }

    const emailValidatorStub = new EmailValidatorStub()
    const sut = new SignUpController(emailValidatorStub)

    return {
      sut,
      emailValidatorStub
    }
  }

  test('Ensure return 400 if no name is provided', () => {
    const { sut } = makeSut()

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
    const { sut } = makeSut()

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
    const { sut } = makeSut()

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
    const { sut } = makeSut()

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
    const { sut, emailValidatorStub } = makeSut()

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)

    const response = sut.handle(httpRequest)
    const { statusCode, body } = response

    expect(statusCode).toBe(400)
    expect(body).toEqual(new InvalidParamError('email'))
  })

  test('Ensure email validator is called with email field', () => {
    const { sut, emailValidatorStub } = makeSut()

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    const emailValidatorSpy = jest.spyOn(emailValidatorStub, 'isValid')

    sut.handle(httpRequest)

    expect(emailValidatorSpy).toHaveBeenCalledWith(httpRequest.body.email)
  })

  test('Ensure returns 500 if email validator throws', () => {
    const { sut, emailValidatorStub } = makeSut()

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })

    const response = sut.handle(httpRequest)
    const { statusCode, body } = response

    expect(statusCode).toBe(500)
    expect(body).toEqual(new ServerError())
  })

  test('Ensure return 201 if email provided is valid', () => {
    const { sut, emailValidatorStub } = makeSut()

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(true)

    const response = sut.handle(httpRequest)
    const { statusCode } = response

    expect(statusCode).toBe(201)
  })
})
