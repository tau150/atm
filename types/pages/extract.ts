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
