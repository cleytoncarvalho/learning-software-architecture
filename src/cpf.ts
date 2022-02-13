import { InvalidCpfException } from "./cpf-exceptions";

export class Cpf {
  private readonly cpf: string;

  get value(): string {
    return this.cpf;
  }

  private constructor(cpf: string) {
    this.cpf = cpf;
    if (!this.validateCpf()) throw new InvalidCpfException();
  }

  static create(cpf: string): Cpf {
    return new Cpf(cpf.replace(/\D/g, ""));
  }

  private validateCpf(): boolean {
    if (!this.cpf) return false;
    if (this.cpf.length != 11) return false;
    if (this.areAllDigitsEqual()) return false;
    return this.calculateValidCpf() === this.cpf;
  }

  private areAllDigitsEqual(): boolean {
    return this.cpf.split("").every((digit) => digit === this.cpf[0]);
  }

  private calculateValidCpf(): string {
    const firstNineDigits = this.cpf.substring(0, 9);
    const verifyingDigitOne = this.calculateVerifyingDigit(firstNineDigits);
    const firstTenDigits = firstNineDigits.concat(verifyingDigitOne);
    const verifyingDigitTwo = this.calculateVerifyingDigit(firstTenDigits);
    return firstTenDigits.concat(verifyingDigitTwo);
  }

  private calculateVerifyingDigit(digits: string): string {
    let multiplier = digits.length + 1;
    const sum = digits
      .split("")
      .map((digit) => +digit * multiplier--)
      .reduce((partialSum, currentValue) => partialSum + currentValue);
    const rest = sum % 11;
    if (rest < 2) return "0";
    return (11 - rest).toString();
  }
}
