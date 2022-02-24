interface ValidateCouponInputProps {
  code: string;
  currentDate: Date;
}

export class ValidateCouponInput {
  readonly code: string;
  readonly currentDate: Date;

  constructor(props: ValidateCouponInputProps) {
    this.code = props.code;
    this.currentDate = props.currentDate;
  }
}
