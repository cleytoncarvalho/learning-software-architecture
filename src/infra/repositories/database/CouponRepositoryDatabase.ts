import { Coupon } from "../../../domain/entities/coupon/Coupon";
import { CouponRepository } from "../../../domain/repositories/CouponRepository";
import { Connection } from "../../database/Connection";

export class CouponRepositoryDatabase implements CouponRepository {
  constructor(readonly connection: Connection) {}

  async getByCode(code: string): Promise<Coupon | undefined> {
    const [coupon] = await this.connection.query(
      "select * from ccca.coupon where code = $1",
      [code]
    );

    return new Coupon({
      code: coupon.code,
      percentage: parseInt(coupon.percentage),
      expirationDate: new Date(coupon.expire_date),
    });
  }
}
