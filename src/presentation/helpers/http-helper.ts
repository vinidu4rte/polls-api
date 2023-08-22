import { type HttpResponse } from '../protocols/http'

export const badRequest = (error: Error): HttpResponse => {
  return {
    statusCode: 400,
    body: error
  }
}

export const created = (body: any): HttpResponse => {
  return {
    statusCode: 201,
    body
  }
}
