type Method = "GET" | "PATCH" | "POST" | "DELETE" | "PUT";

interface FetcherParams {
  method?: Method | undefined;
  body?: Record<string, any> | null;
}

export default function fetcher<T>(url: string, { method, body }: FetcherParams = {}): Promise<T> {
  const requestOptions = {
    method: method ?? "GET",
    headers: {
      "content-type": "application/json",
    },
    body: body && JSON.stringify(body),
  };

  return fetch(url, requestOptions)
    .then((res) => {
      return res.ok
        ? res.json()
        : res
            .json()
            .then((res) => Promise.reject({ status: res?.status, message: res?.data?.message }));
    })
    .catch((error) => {
      throw error;
    });
}
