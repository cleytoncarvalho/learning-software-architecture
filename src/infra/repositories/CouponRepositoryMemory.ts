import { CouponRepository } from "../../domain/repositories/CouponRepository";
import { Coupon } from "../../domain/entities/coupon/Coupon";

export class CouponRepositoryMemory implements CouponRepository {
  private coupons: Coupon[];

  constructor() {
    this.coupons = [
      new Coupon({
        code: "VALE20",
        percentage: 20,
        expirationDate: new Date("2050-10-10T10:00:00"),
      }),
      new Coupon({
        code: "VALE20_EXPIRED",
        percentage: 20,
        expirationDate: new Date("2020-10-10T10:00:00"),
      }),
    ];
  }

  async getByCode(code: string): Promise<Coupon | undefined> {
    return this.coupons.find((coupon) => coupon.code === code);
  }
}
