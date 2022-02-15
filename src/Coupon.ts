interface CouponProps {
  code: string;
  percentage: number;
}

export class Coupon {
  readonly code: string;
  readonly percentage: number;

  constructor(props: CouponProps) {
    this.code = props.code;
    this.percentage = props.percentage;
  }
}
