export interface IApiError {
  message: string;
  status: number;
}

export default class ApiError extends Error {
  name: string;

  constructor(error: IApiError) {
    super(error.message);
    this.name = String(error.status);
  }
}
