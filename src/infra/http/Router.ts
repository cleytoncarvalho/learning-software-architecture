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
      const output = await ordersController.getOrders();
      return output;
    });
    this.http.route("get", "/orders/:code", async (params: any, body: any) => {
      const ordersController = new OrdersController(this.repositoryFactory);
      const output = await ordersController.getOrder(params.code);
      return output;
    });
    this.http.route("post", "/place-order", async (params: any, body: any) => {
      const ordersController = new OrdersController(this.repositoryFactory);
      const output = await ordersController.placeOrder(
        body.cpf,
        body.orderItems,
        body.coupon
      );
      return output;
    });
    this.http.route(
      "post",
      "/simulate-freight",
      async (params: any, body: any) => {
        const ordersController = new OrdersController(this.repositoryFactory);
        const output = await ordersController.simulateFreight(body.orderItems);
        return output;
      }
    );
    this.http.route(
      "post",
      "/validate-coupon",
      async (params: any, body: any) => {
        const ordersController = new OrdersController(this.repositoryFactory);
        const output = await ordersController.validateCoupon(body.code);
        return output;
      }
    );
  }
}
