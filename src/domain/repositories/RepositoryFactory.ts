import { OrderRepository } from "./OrderRepository";
import { ItemRepository } from "./ItemRepository";
import { CouponRepository } from "./CouponRepository";

export interface RepositoryFactory {
  createOrderRepository(): OrderRepository;
  createItemRepository(): ItemRepository;
  createCouponRepository(): CouponRepository;
}
