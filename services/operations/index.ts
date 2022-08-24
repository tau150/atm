import type {
  SuccessResponse,
  BalanceData,
  ExtractData,
  DepositData,
  ExtractParams,
  DepositParams,
} from "./types";

import fetcher from "utils/fetcher";

export const extract = ({ document, amount }: ExtractParams) =>
  fetcher<SuccessResponse<ExtractData>>("/api/extract", {
    method: "POST",
    body: { document, amount },
  });

export const balance = (userDocument: number | undefined | null) =>
  fetcher<SuccessResponse<BalanceData>>(`/api/balance/${userDocument}`);

export const deposit = ({ document, amount }: DepositParams) =>
  fetcher<SuccessResponse<DepositData>>("/api/deposit", {
    method: "POST",
    body: { document, amount },
  });
