import { GetOrderList } from "../../application/usecases/get-order-list/GetOrderList";
import { RepositoryFactory } from "../../domain/repositories/RepositoryFactory";

export class OrdersController {
  constructor(readonly repositoryFactory: RepositoryFactory) {}

  async getOrders(): Promise<any> {
    const orderRepository = this.repositoryFactory.createOrderRepository();
    const getOrderList = new GetOrderList(orderRepository);
    const output = await getOrderList.execute();
    return output.orders;
  }
}
