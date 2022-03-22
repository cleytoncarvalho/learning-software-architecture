import { Order } from "../../../domain/entities/order/Order";
import { OrderCode } from "../../../domain/entities/order/OrderCode";
import { OrderRepository } from "../../../domain/repositories/OrderRepository";
import { Connection } from "../../database/Connection";

export class OrderRepositoryDatabase implements OrderRepository {
  constructor(private readonly connection: Connection) {}

  async getByCode(code: string): Promise<Order | undefined> {
    const [result] = await this.connection.query(
      "select * from ccca.order where code = $1",
      [code]
    );
    if (!result) throw new Error("Order not found");
    return new Order({
      cpf: result.cpf,
      issueDate: result.issue_date,
      sequence: result.sequence,
    });
  }

  async getList(): Promise<Order[]> {
    const orders: Order[] = [];
    const results = await this.connection.query("select * from ccca.order", []);

    for (const result of results) {
      orders.push(
        new Order({
          cpf: result.cpf,
          issueDate: result.issue_date,
          sequence: result.sequence,
        })
      );
    }

    return orders;
  }

  async save(order: Order): Promise<OrderCode> {
    await this.connection.query(
      "insert into ccca.order (coupon,code,cpf,issue_date,freight,sequence,total) values ($1,$2,$3,$4,$5,$6,$7)",
      [
        order.coupon?.code,
        order.code.value,
        order.cpf.value,
        order.issueDate,
        order.shipping,
        order.sequence,
        order.total,
      ]
    );

    return order.code;
  }

  async count(): Promise<number> {
    const [result] = await this.connection.query(
      "select count(*) as counter from ccca.order",
      []
    );
    return parseInt(result.counter);
  }

  async clean(): Promise<void> {
    await this.connection.query("delete from ccca.order_item", []);
    await this.connection.query("delete from ccca.order", []);
  }
}
