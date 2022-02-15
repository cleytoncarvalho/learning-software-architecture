import { InvalidCpfException } from "./CpfExceptions";

export class Cpf {
  private cpf: string;
  private normalizedCpf: string = "";

  get value(): string {
    return this.cpf;
  }

  private constructor(cpf: string) {
    this.cpf = cpf;
    this.normalizeCpf();
    if (!this.validateCpf()) throw new InvalidCpfException();
  }

  static create(cpf: string): Cpf {
    return new Cpf(cpf);
  }

  private normalizeCpf() {
    this.normalizedCpf = this.cpf.replace(/[\.\-]/g, "");
  }

  private validateCpf(): boolean {
    if (!this.normalizedCpf) return false;
    if (this.isCpfLengthValid()) return false;
    if (this.areAllCpfDigitsEqual()) return false;
    return this.calculateValidCpf() === this.normalizedCpf;
  }

  private isCpfLengthValid(): boolean {
    return this.normalizedCpf.length != 11;
  }

  private areAllCpfDigitsEqual(): boolean {
    const [firstDigit] = this.normalizedCpf[0];
    return [...this.normalizedCpf].every((digit) => digit === firstDigit);
  }

  private calculateValidCpf(): string {
    const firstNineDigits = this.normalizedCpf.slice(0, 9);
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
