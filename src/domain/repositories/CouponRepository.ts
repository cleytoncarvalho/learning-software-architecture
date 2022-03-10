import { Coupon } from "../entities/coupon/Coupon";

export interface CouponRepository {
  getByCode(code: string): Promise<Coupon | undefined>;
}
