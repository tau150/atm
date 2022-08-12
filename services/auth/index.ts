import type { LoginUserState, UserLoginResponse } from "types";

import fetcher from "utils/fetcher";

export const login = (user: LoginUserState) =>
  fetcher<UserLoginResponse>("/api/auth", { method: "POST", body: { ...user } });
