import { OrderRepository } from "../../domain/repositories/OrderRepository";
import { Order } from "../../domain/entities/order/Order";

export class OrderRepositoryMemory implements OrderRepository {
  orders: Order[];

  constructor() {
    this.orders = [];
  }

  async save(order: Order): Promise<void> {
    this.orders.push(order);
  }

  async count(): Promise<number> {
    return this.orders.length;
  }
}
