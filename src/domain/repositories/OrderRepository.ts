import { Order } from "../entities/order/Order";
import { OrderCode } from "../entities/order/OrderCode";

export interface OrderRepository {
  getByCode(code: string): Promise<Order | undefined>;
  getList(): Promise<Order[]>;
  save(order: Order): Promise<OrderCode>;
  count(): Promise<number>;
  clean(): Promise<void>;
}
