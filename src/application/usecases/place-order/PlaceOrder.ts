import { Order } from "../../../domain/entities/order/Order";
import { OrderRepository } from "../../repositories/OrderRepository";
import { ItemRepository } from "../../repositories/ItemRepository";
import { CouponRepository } from "../../repositories/CouponRepository";
import { PlaceOrderInput } from "./PlaceOrderInput";
import { PlaceOrderOutput } from "./PlaceOrderOutput";

export class PlaceOrder {
  constructor(
    readonly orderRepository: OrderRepository,
    readonly itemRepository: ItemRepository,
    readonly couponRepository: CouponRepository
  ) {}

  execute(input: PlaceOrderInput): PlaceOrderOutput {
    const order = new Order({
      code: "123",
      cpf: input.cpf,
      issueDate: new Date(),
    });

    for (const orderItem of input.orderItems) {
      const item = this.itemRepository.getById(orderItem.itemId);
      if (item) {
        order.addItem({ item, quantity: orderItem.quantity });
      }
    }

    if (input.coupon) {
      const coupon = this.couponRepository.getByCode(input.coupon);
      if (coupon) order.addCoupon(coupon);
    }

    this.orderRepository.save(order);

    return {
      total: order.total,
    };
  }
}
