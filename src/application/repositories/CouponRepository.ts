import { Coupon } from "../../domain/entities/coupon/Coupon";

export interface CouponRepository {
  getByCode(code: string): Coupon | undefined;
}
