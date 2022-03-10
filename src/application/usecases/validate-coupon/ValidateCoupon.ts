import { CouponRepository } from "../../../domain/repositories/CouponRepository";
import { ValidateCouponInput } from "./ValidateCouponInput";
import { ValidateCouponOutput } from "./ValidateCouponOutput";

export class ValidateCoupon {
  constructor(readonly couponRepository: CouponRepository) {}

  async execute(input: ValidateCouponInput): Promise<ValidateCouponOutput> {
    let isValid = false;

    const coupon = await this.couponRepository.getByCode(input.code);

    if (coupon) {
      isValid = !coupon.isExpired(input.currentDate);
    }

    return new ValidateCouponOutput({ isValid });
  }
}
