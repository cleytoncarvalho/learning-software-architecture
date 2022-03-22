import { RepositoryFactory } from "../../domain/repositories/RepositoryFactory";
import { OrdersController } from "../controllers/OrderController";
import { Http } from "./Http";

export class Router {
  constructor(
    readonly http: Http,
    readonly repositoryFactory: RepositoryFactory
  ) {}

  init() {
    this.http.route("get", "/orders", async (params: any, body: any) => {
      const ordersController = new OrdersController(this.repositoryFactory);
      const output = ordersController.getOrders();
      return output;
    });
  }
}
