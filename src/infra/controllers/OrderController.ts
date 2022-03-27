import { GetOrderByCode } from "../../application/usecases/get-order-by-code/GetOrderByCode";
import { GetOrderList } from "../../application/usecases/get-order-list/GetOrderList";
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
}
