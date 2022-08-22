import { Routes } from "types";

export type ActionRoute = Routes.EXTRACT | Routes.BALANCE | Routes.DEPOSITS;

export enum ButtonActions {
  Delete = "Delete",
  Enter = "Enter",
}

export enum RadioValuesEnum {
  FiveHundred = "500",
  TwoThousand = "2000",
  ThreeThousand = "3000",
  FiveThousand = "5000",
  SixThousand = "6000",
  Other = "other",
}

export type RadioValue =
  | RadioValuesEnum.FiveHundred
  | RadioValuesEnum.TwoThousand
  | RadioValuesEnum.ThreeThousand
  | RadioValuesEnum.FiveThousand
  | RadioValuesEnum.SixThousand
  | RadioValuesEnum.Other
  | "";

export interface InputsState {
  "100": string;
  "200": string;
  "500": string;
  "1000": string;
}

export type InputKey = "100" | "200" | "500" | "1000" | "";
