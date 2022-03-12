export interface GetOrderByCodeInputProps {
  code: string;
}

export class GetOrderByCodeInput {
  readonly code: string;

  constructor(props: GetOrderByCodeInputProps) {
    this.code = props.code;
  }
}
