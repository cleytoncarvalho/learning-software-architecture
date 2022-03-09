import { Order } from "../../../domain/entities/order/Order";
import { OrderRepository } from "../../../domain/repositories/OrderRepository";
import { ItemRepository } from "../../../domain/repositories/ItemRepository";
import { CouponRepository } from "../../../domain/repositories/CouponRepository";
import { PlaceOrderInput } from "./PlaceOrderInput";
import { PlaceOrderOutput } from "./PlaceOrderOutput";

export class PlaceOrder {
  constructor(
    readonly orderRepository: OrderRepository,
    readonly itemRepository: ItemRepository,
    readonly couponRepository: CouponRepository
  ) {}

  execute(input: PlaceOrderInput): PlaceOrderOutput {
    const sequence = this.orderRepository.count() + 1;
    const order = new Order({
      cpf: input.cpf,
      issueDate: input.issueDate,
      sequence,
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
      code: order.code.value,
      total: order.total,
    };
  }
}
