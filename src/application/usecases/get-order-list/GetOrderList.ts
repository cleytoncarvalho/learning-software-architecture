import { OrderRepository } from "../../../domain/repositories/OrderRepository";
import { GetOrderListOutput } from "./GetOrderListOutput";

export class GetOrderList {
  constructor(readonly orderRepository: OrderRepository) {}

  async execute(): Promise<GetOrderListOutput> {
    const orders = await this.orderRepository.getList();
    return new GetOrderListOutput({ orders });
  }
}
