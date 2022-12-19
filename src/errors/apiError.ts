export interface IApiError {
  message: string;
  status: number;
}

export default class ApiError extends Error {
  code: string;

  constructor(error: IApiError) {
    super(error.message);
    this.code = String(error.status);
  }
}
