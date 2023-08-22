import { badRequest, created } from '../helpers/http-helper'
import { type HttpRequest, type HttpResponse } from '../protocols/http'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return badRequest(new Error('Missing param: name'))
    }

    if (!httpRequest.body.email) {
      return badRequest(new Error('Missing param: email'))
    }

    return created({
      message: 'User successfully created.'
    })
  }
}
