import {mainDishPriceTable, toppingPriceTable} from './const';
import {
  Demographic,
  MainDish,
  MainDishName,
  ToppingName,
  ToppingRecord,
} from './types';

export const getMainDishName = (name: MainDishName) => {
  switch (name) {
    case 'xet_tan_chay':
      return 'XET. Tan Chảy';
    case 'xet_truyen_thong':
      return 'XET. Truyền thống';
    case 'none':
      return '';
    default:
      return 'ERROR';
  }
};

export const getToppingName = (name: ToppingName) => {
  switch (name) {
    case 'xuc_xich':
      return 'Xúc xích';
    case 'pho_mai_lat':
      return 'Phô mai lát';
    case 'pho_mai_soi':
      return 'Phô mai sợi';
    case 'ga_popcorn':
      return 'Gà popcorn';
    case 'xa_lach':
      return 'Xà lách';
    default:
      return 'ERROR';
  }
};

export const minifyDish = (dishList: MainDish[]) => {
  const dishMap: Record<string, MainDish> = {};

  for (const dish of dishList) {
    const key = `${dish.name}_${JSON.stringify(dish.toppings)}_${JSON.stringify(
      dish.size,
    )}`;

    if (dishMap[key]) {
      dishMap[key].amount += dish.amount;
    } else {
      dishMap[key] = {...dish};
    }
  }
  return Object.values(dishMap);
};

export const getTopping = (dish: MainDish) => {
  if (!dish.toppings) {
    return '';
  }

  const toppingKeys = dish.toppings
    ? (Object.keys(dish.toppings) as ToppingName[])
    : [];

  return toppingKeys.reduce((prev, key) => {
    const amount = dish?.toppings?.[key];

    if (prev.length === 0) {
      return amount ? `${amount} ${getToppingName(key)}` : prev;
    }

    return amount ? `${prev} | ${amount} ${getToppingName(key)}` : prev;
  }, '');
};

export const getDishUnitPrice = (dish: MainDish) => {
  const toppingKeys = dish.toppings
    ? (Object.keys(dish.toppings) as ToppingName[])
    : [];

  return (
    mainDishPriceTable[dish.name][dish.size] +
    toppingKeys.reduce((prev, key) => {
      const amount = dish?.toppings?.[key] || 0;
      return prev + toppingPriceTable[key] * amount;
    }, 0)
  );
};

export const getDishTotalPrice = (dish: MainDish) =>
  getDishUnitPrice(dish) * dish.amount;

export const getDemographicName = (demographic: Demographic) => {
  switch (demographic) {
    case 'cap_1':
      return 'Cấp 1';
    case 'cap_2':
      return 'Cấp 2';
    case 'cap_3':
      return 'Cấp 3';
    case 'kid':
      return 'Trẻ em';
    case '20-30':
      return '20-30 Tuổi';
    case '>30':
      return '>30 Tuổi';

    default:
      break;
  }
};

export const isToppingRecordSelected = (toppingRecord: ToppingRecord) => {
  return (Object.keys(toppingRecord) as ToppingName[]).reduce((prev, cur) => {
    return prev + toppingRecord[cur];
  }, 0);
};

export const getDishNameInInvoice = (dish: MainDish) => {
  if (dish.name === 'none') {
    return getTopping(dish);
  }

  return `${getMainDishName(dish.name)} size ${dish.size} | ${getTopping(
    dish,
  )}`;
};
