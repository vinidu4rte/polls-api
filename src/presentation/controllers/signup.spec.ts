import { SignUpController } from './signup'

describe('SignUpController', () => {
  test('Ensure return 400 if no name is provided', () => {
    const sut = new SignUpController()

    const httpRequest = {
      email: 'any_email@email.com',
      password: 'any_password',
      passwordConfirmation: 'any_password_confirmation'
    }

    const response = sut.handle(httpRequest)
    const { statusCode, body } = response

    expect(statusCode).toBe(400)
    expect(body).toEqual(new Error('Missing param: name'))
  })

  test('Ensure return 400 if no email is provided', () => {
    const sut = new SignUpController()

    const httpRequest = {
      name: 'any_name',
      password: 'any_password',
      passwordConfirmation: 'any_password_confirmation'
    }

    const response = sut.handle(httpRequest)
    const { statusCode, body } = response

    expect(statusCode).toBe(400)
    expect(body).toEqual(new Error('Missing param: email'))
  })
})
