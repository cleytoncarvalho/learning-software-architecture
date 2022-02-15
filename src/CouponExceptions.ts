export class ExpiredCouponException extends Error {
  constructor(message: string = "Coupon expired") {
    super(message);
  }
}
