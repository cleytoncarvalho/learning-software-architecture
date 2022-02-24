interface ValidateCouponOutputProps {
  isValid: boolean;
}

export class ValidateCouponOutput {
  readonly isValid: boolean;

  constructor(props: ValidateCouponOutputProps) {
    this.isValid = props.isValid;
  }
}
