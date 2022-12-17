export async function checkApiError<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const err = await res.json();
    err.status = res.status;

    return Promise.reject(err);
  }

  return res.json();
};
