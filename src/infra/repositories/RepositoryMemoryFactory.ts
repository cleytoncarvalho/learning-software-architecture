import { RepositoryFactory } from "../../domain/repositories/RepositoryFactory";
import { OrderRepositoryMemory } from "./OrderRepositoryMemory";
import { ItemRepositoryMemory } from "./ItemRepositoryMemory";
import { CouponRepositoryMemory } from "./CouponRepositoryMemory";

export class RepositoryMemoryFactory implements RepositoryFactory {
  createOrderRepository() {
    return new OrderRepositoryMemory();
  }

  createItemRepository() {
    return new ItemRepositoryMemory();
  }

  createCouponRepository() {
    return new CouponRepositoryMemory();
  }
}
