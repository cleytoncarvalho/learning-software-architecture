import { OrderRepository } from "../../domain/repositories/OrderRepository";
import { Order } from "../../domain/entities/order/Order";

export class OrderRepositoryMemory implements OrderRepository {
  orders: Order[];

  constructor() {
    this.orders = [
      new Order({
        cpf: "516.178.806-20",
        issueDate: new Date("2020-10-10T10:00:00"),
        sequence: 1,
      }),
    ];
  }

  async getByCode(code: string): Promise<Order | undefined> {
    return this.orders.find((item) => item.code.value === code);
  }

  async save(order: Order): Promise<void> {
    this.orders.push(order);
  }

  async count(): Promise<number> {
    return this.orders.length;
  }
}
