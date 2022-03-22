import { RepositoryFactory } from "../../../domain/repositories/RepositoryFactory";
import { OrderRepositoryDatabase } from "./OrderRepositoryDatabase";
import { ItemRepositoryDatabase } from "./ItemRepositoryDatabase";
import { CouponRepositoryDatabase } from "./CouponRepositoryDatabase";
import { Connection } from "../../database/Connection";

export class RepositoryDatabaseFactory implements RepositoryFactory {
  constructor(readonly connection: Connection) {}

  createOrderRepository() {
    return new OrderRepositoryDatabase(this.connection);
  }

  createItemRepository() {
    return new ItemRepositoryDatabase(this.connection);
  }

  createCouponRepository() {
    return new CouponRepositoryDatabase(this.connection);
  }
}
