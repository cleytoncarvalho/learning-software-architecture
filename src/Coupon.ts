interface CouponProps {
  code: string;
  percentage: number;
  expirationDate: Date;
}

export class Coupon {
  readonly code: string;
  readonly percentage: number;
  readonly expirationDate: Date;

  constructor(props: CouponProps) {
    this.code = props.code;
    this.percentage = props.percentage;
    this.expirationDate = props.expirationDate;
  }
}
