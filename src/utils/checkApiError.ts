import ApiError from '../errors/apiError';

export async function checkApiError<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const err = await res.json();
    err.status = res.status;

    throw new ApiError(err);
  }

  return res.json();
}
