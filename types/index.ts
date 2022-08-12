export enum ButtonStatus {
  cancel,
  enter,
}

export enum DeleteActions {
  Delete = "Delete",
  Backspace = "Backspace",
}

export enum LoginStep {
  Password = "Password",
  Document = "Document",
}

export enum ResultStatus {
  OK = "OK",
  NOT_ENOUGH_BALANCE = "NOT_ENOUGH_BALANCE",
  UNAUTHORIZED = "UNAUTHORIZED",
  WRONG_CREDENTIALS = "WRONG_CREDENTIALS",
}

export enum Routes {
  HOME = "/home",
  BALANCE = "/balance",
  EXTRACT = "/extract",
  OTHER = "/otherAmount",
  DEPOSITS = "/deposits",
}
export interface User {
  id: number;
  name: string;
  document: number;
  password: number;
  balance: number;
  dateUpdated?: string;
}
export interface AuthUser {
  id: number | null;
  document: number | null;
  name: string | null;
  isAuthenticated: boolean;
  accountNumber: string | null;
}
export interface UserLoginResponse {
  data: Omit<AuthUser, "isAuthenticated">;
}
export interface LoginUserState {
  password: string | null;
  document: string | null;
}
export interface ErrorResponse extends Error {
  status: ResultStatus;
  message: string;
}
