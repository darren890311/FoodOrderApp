import { Timestamp } from "firebase/firestore";
import { StringLiteral } from "typescript";

export type PaymentMethodType = "cash" | "card" | "phone";

export type ImageType = {
  src: string;
  title: string;
};

export interface IRestaurant {
  name: string;
  address: string;
  phone: string;
  closingTime: Timestamp;
  openingTime: Timestamp;
  paymentMethods: PaymentMethodType[];
}

export interface ICategory {
  id: string;
  createDate: string;
  lastupdate: string;
  createBy: string;
  image: ImageType;
  title: string;
  description: string;
}

export interface IItem {
  id: string;
  createDate: string;
  lastupdate: string;
  createBy: string;
  image: ImageType;
  description: string;
  price: number;
  label: string;
  category: string;
  variants: IVariant[];
}

export interface IVariant {
  isRequired: boolean;
  allowMultiple: boolean;
  type: string;
  choices: IChoice[];
}

export interface IChoice {
  price: number;
  label: string;
}

export type OrderStatus = "pending" | "confirmed" | "cancelled" | "completed";

export interface IOrder {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  lines: ILine[];
  comments?: string;
  reason?: string;
  pickUpTime: string;
  paymentMethods: PaymentMethodType[];
  status?: OrderStatus;
  subTotal: number;
  total: number;
}

export interface ILine {
  label: string;
  price: number;
  quantity: number;
  instructions: string;
  value: ILineValue[];
}

export interface ILineValue {
  variant: string;
  value: string;
  price: number;
}
