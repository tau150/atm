export interface ExtractParams {
  document: number | undefined | null;
  amount: string | "";
}

export interface DepositParams {
  document: number | undefined | null;
  amount: number;
}

export interface SuccessResponse<T> {
  status: string;
  data: T;
}

export interface ExtractData {
  rest: number;
}

export interface BalanceData {
  balance: number;
}

export interface DepositData {
  balance: number;
}
