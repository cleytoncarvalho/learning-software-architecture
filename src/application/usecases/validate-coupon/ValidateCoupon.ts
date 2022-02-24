import { CouponRepository } from "../../repositories/CouponRepository";
import { ValidateCouponInput } from "./ValidateCouponInput";
import { ValidateCouponOutput } from "./ValidateCouponOutput";

export class ValidateCoupon {
  constructor(readonly couponRepository: CouponRepository) {}

  execute(input: ValidateCouponInput): ValidateCouponOutput {
    let isValid = false;

    const coupon = this.couponRepository.getByCode(input.code);

    if (coupon) {
      isValid = !coupon.isExpired(input.currentDate);
    }

    return { isValid };
  }
}
