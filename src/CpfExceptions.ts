export class InvalidCpfException extends Error {
  constructor(message: string = "Invalid CPF") {
    super(message);
  }
}
