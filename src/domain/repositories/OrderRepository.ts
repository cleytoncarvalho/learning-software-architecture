import { Order } from "../entities/order/Order";

export interface OrderRepository {
  save(order: Order): Promise<void>;
  count(): Promise<number>;
}
