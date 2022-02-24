export enum CouponExceptionType {
  COUPON_EXPIRED = "COUPON_EXPIRED",
}

export class CouponException extends Error {
  constructor(type: CouponExceptionType) {
    super(type);
  }
}
