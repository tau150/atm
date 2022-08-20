type Method = "GET" | "PATCH" | "POST" | "DELETE" | "PUT";

export interface FetcherParams {
  method?: Method | undefined;
  body?: Record<string, any> | null;
}
