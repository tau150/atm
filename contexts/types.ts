import type { AuthUser } from "types";

export interface AuthContextProps {
  children: React.ReactNode;
}

export interface AuthContextInterface {
  authUser: AuthUser;
  login: Function;
  logout: Function;
}
