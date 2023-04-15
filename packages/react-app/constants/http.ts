export enum ResponseStatusCode {
  OK = 200,
  Created = 201,

  NotFound = 404,
  MethodNotAllowed = 405,
  UnprocessableEntity = 422,

  InternalServerError = 500,
}

export enum ResponseMessage {
  InternalServerError = 'Internal server error',
  NotFound = 'Not found',
  UnprocessableEntity = 'Unprocessable entity',
  MethodNotAllowed = 'Method not allowed',
}
