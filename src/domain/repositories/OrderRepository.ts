import { Order } from "../entities/order/Order";

export interface OrderRepository {
  getByCode(code: string): Promise<Order | undefined>;
  getList(): Promise<Order[]>;
  save(order: Order): Promise<void>;
  count(): Promise<number>;
}
