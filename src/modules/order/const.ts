import { Demographic, MainDishName, MainDishSize, ToppingName } from "./types";

export const defaultToppingRecord: Record<ToppingName, number> = {
  pho_mai_lat: 0,
  pho_mai_soi: 0,
  xuc_xich: 0,
  ga_popcorn: 0,
  xa_lach: 0,
};

export const toppingNames: ToppingName[] = [
  "pho_mai_lat",
  "pho_mai_soi",
  "xuc_xich",
  "ga_popcorn",
  "xa_lach",
];

export const demographics: Demographic[] = [
  "kid",
  "cap_1",
  "cap_2",
  "cap_3",
  "20-30",
  ">30",
];

export const defaultDemographics: Record<Demographic, boolean> = {
  kid: false,
  cap_1: false,
  cap_2: false,
  cap_3: false,
  ">30": false,
  "20-30": false,
};

export const toppingPriceTable: Record<ToppingName, number> = {
  pho_mai_lat: 2,
  pho_mai_soi: 4,
  xuc_xich: 4,
  ga_popcorn: 6,
  xa_lach: 2,
};

export const mainDishPriceTable: Record<
  MainDishName,
  Record<MainDishSize, number>
> = {
  xet_truyen_thong: {
    M: 23,
    L: 28,
  },
  xet_tan_chay: {
    M: 28,
    L: 33,
  },
  none: {
    M: 0,
    L: 0,
  },
};
