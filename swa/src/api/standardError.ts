export type ErrorCode =
  'NOT_FOUND' | 'INVALID_REQUEST_BODY' | 'UNHANDLED_EXCEPTION'

type StandardError = {
  errorCode: ErrorCode,
  message: string
};

export default StandardError;