import { OrderRepository } from "../../../domain/repositories/OrderRepository";
import { GetOrderByCodeInput } from "./GetOrderByCodeInput";
import { GetOrderByCodeOutput } from "./GetOrderByCodeOutput";

export class GetOrderByCode {
  constructor(readonly orderRepository: OrderRepository) {}

  async execute(
    getOrderByCodeInput: GetOrderByCodeInput
  ): Promise<GetOrderByCodeOutput> {
    const order = await this.orderRepository.getByCode(
      getOrderByCodeInput.code
    );
    if (!order) {
      throw new Error("Order not found");
    }
    return new GetOrderByCodeOutput({ code: order.code.value });
  }
}
