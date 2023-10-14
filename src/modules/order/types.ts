export type ToppingName =
  | 'xuc_xich'
  | 'pho_mai_lat'
  | 'pho_mai_soi'
  | 'xa_lach'
  | 'ga_popcorn';

export type MainDishName = 'xet_truyen_thong' | 'xet_tan_chay' | 'none';

export type MainDishSize = 'M' | 'L';

export type ToppingRecord = Record<ToppingName, number>;

export interface Item {
  name: string;
  amount: number;
}

export interface MainDish extends Item {
  name: MainDishName;
  size: MainDishSize;
  toppings?: ToppingRecord;
}

export type Order = {
  title: string;
  items: MainDish[];
  createdAt: string;
};

export type Demographic = 'kid' | 'cap_1' | 'cap_2' | 'cap_3' | '20-30' | '>30';

export type OrderStatus = 'CREATED' | 'PROCESSING' | 'DONE' | 'DELETED';
