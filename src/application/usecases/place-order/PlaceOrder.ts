import { Order } from "../../../domain/entities/order/Order";
import { OrderRepository } from "../../../domain/repositories/OrderRepository";
import { ItemRepository } from "../../../domain/repositories/ItemRepository";
import { CouponRepository } from "../../../domain/repositories/CouponRepository";
import { RepositoryFactory } from "../../../domain/repositories/RepositoryFactory";
import { PlaceOrderInput } from "./PlaceOrderInput";
import { PlaceOrderOutput } from "./PlaceOrderOutput";

export class PlaceOrder {
  private readonly orderRepository: OrderRepository;
  private readonly itemRepository: ItemRepository;
  private readonly couponRepository: CouponRepository;

  constructor(readonly repositoryFactory: RepositoryFactory) {
    this.orderRepository = repositoryFactory.createOrderRepository();
    this.itemRepository = repositoryFactory.createItemRepository();
    this.couponRepository = repositoryFactory.createCouponRepository();
  }

  async execute(input: PlaceOrderInput): Promise<PlaceOrderOutput> {
    const sequence = (await this.orderRepository.count()) + 1;
    const order = new Order({
      cpf: input.cpf,
      issueDate: input.issueDate,
      sequence,
    });

    for (const orderItem of input.orderItems) {
      const item = await this.itemRepository.getById(orderItem.itemId);
      if (item) {
        order.addItem({ item, quantity: orderItem.quantity });
      }
    }

    if (input.coupon) {
      const coupon = await this.couponRepository.getByCode(input.coupon);
      if (coupon) order.addCoupon(coupon);
    }

    await this.orderRepository.save(order);

    return new PlaceOrderOutput({
      code: order.code.value,
      total: order.total,
    });
  }
}
