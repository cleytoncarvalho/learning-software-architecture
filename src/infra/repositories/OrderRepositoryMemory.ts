import { OrderRepository } from "../../application/repositories/OrderRepository";
import { Order } from "../../domain/entities/order/Order";

export class OrderRepositoryMemory implements OrderRepository {
  orders: Order[];

  constructor() {
    this.orders = [];
  }

  save(order: Order): void {
    this.orders.push(order);
  }

  count(): number {
    return this.orders.length;
  }
}
