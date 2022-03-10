import { CouponRepository } from "../../domain/repositories/CouponRepository";
import { Coupon } from "../../domain/entities/coupon/Coupon";

export class CouponRepositoryMemory implements CouponRepository {
  private coupons: Coupon[];

  constructor() {
    this.coupons = [
      new Coupon({ code: "VALE10", percentage: 10 }),
      new Coupon({ code: "VALE20", percentage: 20 }),
      new Coupon({
        code: "VALE30",
        percentage: 30,
        expirationDate: new Date("2022-01-01T10:00:00"),
      }),
    ];
  }

  async getByCode(code: string): Promise<Coupon | undefined> {
    return this.coupons.find((coupon) => coupon.code === code);
  }
}
