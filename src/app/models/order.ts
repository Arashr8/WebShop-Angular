import {Product} from './product';

export interface Order {
  id: number;
  companyId: number;
  created: string;
  createdBy: string;
  paymentMethod: string;
  totalPrice: number;
  status: number;
  orderRows: Product[];
}
