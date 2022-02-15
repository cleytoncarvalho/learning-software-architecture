import { InvalidCpfException } from "./cpf-exceptions";

export class Cpf {
  private cpf: string;

  get value(): string {
    return this.cpf;
  }

  private constructor(cpf: string) {
    this.cpf = cpf;
    if (!this.validateCpf()) throw new InvalidCpfException();
  }

  static create(cpf: string): Cpf {
    return new Cpf(cpf);
  }

  private validateCpf(): boolean {
    if (!this.cpf) return false;
    this.cleanCpf();
    if (this.isCpfLengthValid()) return false;
    if (this.areAllCpfDigitsEqual()) return false;
    return this.calculateValidCpf() === this.cpf;
  }

  private cleanCpf() {
    this.cpf = this.cpf.replace(/\D/g, "");
  }

  private isCpfLengthValid(): boolean {
    return this.cpf.length != 11;
  }

  private areAllCpfDigitsEqual(): boolean {
    const [firstDigit] = this.cpf[0];
    return [...this.cpf].every((digit) => digit === firstDigit);
  }

  private calculateValidCpf(): string {
    const firstNineDigits = this.cpf.slice(0, 9);
    const verifyingDigitOne = this.calculateCpfVerifyingDigit(firstNineDigits);
    const firstTenDigits = `${firstNineDigits}${verifyingDigitOne}`;
    const verifyingDigitTwo = this.calculateCpfVerifyingDigit(firstTenDigits);
    return `${firstTenDigits}${verifyingDigitTwo}`;
  }

  private calculateCpfVerifyingDigit(digits: string): string {
    let multiplier = digits.length + 1;
    const sum = [...digits]
      .map((digit) => +digit * multiplier--)
      .reduce((partialSum, currentValue) => partialSum + currentValue);
    const rest = sum % 11;
    return rest < 2 ? "0" : `${11 - rest}`;
  }
}
