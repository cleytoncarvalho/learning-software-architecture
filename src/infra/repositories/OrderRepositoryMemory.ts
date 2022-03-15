import { OrderRepository } from "../../domain/repositories/OrderRepository";
import { Order } from "../../domain/entities/order/Order";
import { OrderCode } from "../../domain/entities/order/OrderCode";

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

  async getList(): Promise<Order[]> {
    return this.orders;
  }

  async save(order: Order): Promise<OrderCode> {
    this.orders.push(order);
    return order.code;
  }

  async count(): Promise<number> {
    return this.orders.length;
  }
}
