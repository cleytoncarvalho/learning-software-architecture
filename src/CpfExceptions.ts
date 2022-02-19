export enum CpfExceptionType {
  INVALID_LENGTH = "INVALID_LENGTH",
  ALL_DIGITS_EQUAL = "ALL_DIGITS_EQUAL",
  INVALID_CPF = "INVALID_CPF",
}

export class CpfException extends Error {
  constructor(type: CpfExceptionType) {
    super(type);
  }
}
