export interface GetOrderByCodeOutputProps {
  code: string;
}

export class GetOrderByCodeOutput {
  readonly code: string;

  constructor(props: GetOrderByCodeOutputProps) {
    this.code = props.code;
  }
}
