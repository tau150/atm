import type { FetcherParams } from "./types";

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
