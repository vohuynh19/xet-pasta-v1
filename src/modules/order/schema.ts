import {PaymentMethod} from '~modules/payment';
import {Demographic, MainDish, OrderStatus} from './types';

export type OrderSchema = {
  id?: string;
  createdAt?: string;
  updatedAt?: string;

  dishes: MainDish[];
  totalPrice: number;
  demographics: Record<Demographic, boolean>;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  imageUrl?: string;
  returnPrice?: number;
};
