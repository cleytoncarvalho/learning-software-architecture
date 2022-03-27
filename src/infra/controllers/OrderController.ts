import { GetOrderByCode } from "../../application/usecases/get-order-by-code/GetOrderByCode";
import { GetOrderList } from "../../application/usecases/get-order-list/GetOrderList";
import { PlaceOrder } from "../../application/usecases/place-order/PlaceOrder";
import { SimulateFreight } from "../../application/usecases/simulate-freight/SimulateFreight";
import { ValidateCoupon } from "../../application/usecases/validate-coupon/ValidateCoupon";
import { RepositoryFactory } from "../../domain/repositories/RepositoryFactory";

export class OrdersController {
  constructor(readonly repositoryFactory: RepositoryFactory) {}

  async getOrder(code: string): Promise<any> {
    const orderRepository = this.repositoryFactory.createOrderRepository();
    const getOrder = new GetOrderByCode(orderRepository);
    const output = await getOrder.execute({ code });
    return output;
  }

  async getOrders(): Promise<any> {
    const orderRepository = this.repositoryFactory.createOrderRepository();
    const getOrderList = new GetOrderList(orderRepository);
    const output = await getOrderList.execute();
    return output.orders;
  }

  async placeOrder(
    cpf: string,
    orderItems: any,
    coupon?: string
  ): Promise<any> {
    const placeOrder = new PlaceOrder(this.repositoryFactory);
    const output = await placeOrder.execute({
      cpf,
      orderItems,
      coupon,
      issueDate: new Date(),
    });
    return output;
  }

  async simulateFreight(orderItems: any): Promise<any> {
    const itemRepository = this.repositoryFactory.createItemRepository();
    const simulateFreight = new SimulateFreight(itemRepository);
    const output = await simulateFreight.execute({ orderItems });
    return output;
  }

  async validateCoupon(code: string): Promise<any> {
    const couponRepository = this.repositoryFactory.createCouponRepository();
    const validateCoupon = new ValidateCoupon(couponRepository);
    const { isValid } = await validateCoupon.execute({
      code,
      currentDate: new Date(),
    });
    return { isValid };
  }
}
