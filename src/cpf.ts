import { CpfException, CpfExceptionType } from "./CpfExceptions";

export class Cpf {
  readonly value: string;

  private constructor(cpf: string) {
    this.value = cpf;
  }

  static create(cpf: string): Cpf {
    this.validate(cpf);
    return new Cpf(cpf);
  }

  private static validate(cpf: string) {
    cpf = this.normalize(cpf);
    if (cpf.length != 11)
      throw new CpfException(CpfExceptionType.INVALID_LENGTH);
    if (this.areAllDigitsEqual(cpf))
      throw new CpfException(CpfExceptionType.ALL_DIGITS_EQUAL);
    if (!this.isCpfValid(cpf))
      throw new CpfException(CpfExceptionType.INVALID_CPF);
  }

  private static normalize(cpf: string): string {
    return cpf.replace(/[\.\-]/g, "");
  }

  private static areAllDigitsEqual(cpf: string): boolean {
    const [firstDigit] = cpf[0];
    return [...cpf].every((digit) => digit === firstDigit);
  }

  private static isCpfValid(cpf: string): boolean {
    const firstNineDigits = cpf.slice(0, 9);
    const verifyingDigitOne = this.calculateVerifyingDigit(firstNineDigits);
    const firstTenDigits = `${firstNineDigits}${verifyingDigitOne}`;
    const verifyingDigitTwo = this.calculateVerifyingDigit(firstTenDigits);
    const calculatedCpf = `${firstTenDigits}${verifyingDigitTwo}`;
    return cpf === calculatedCpf;
  }

  private static calculateVerifyingDigit(digits: string): string {
    let multiplier = digits.length + 1;
    const sum = [...digits]
      .map((digit) => +digit * multiplier--)
      .reduce((partialSum, currentValue) => partialSum + currentValue);
    const rest = sum % 11;
    return rest < 2 ? "0" : `${11 - rest}`;
  }
}
