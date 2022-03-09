import { Coupon } from "../entities/coupon/Coupon";

export interface CouponRepository {
  getByCode(code: string): Coupon | undefined;
}
