export class OrderCode {
  private constructor(readonly value: string) {}

  static create(date: Date, sequence: number = 1): OrderCode {
    const year = date.getFullYear();
    const code = `${year}${sequence.toString().padStart(8, "0")}`;
    return new OrderCode(code);
  }
}
