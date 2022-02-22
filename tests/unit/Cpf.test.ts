import { Cpf } from "../../src/domain/entities/Cpf";
import {
  CpfException,
  CpfExceptionType,
} from "../../src/domain/entities/CpfExceptions";

test("create cpf", () => {
  const inputValue = "516.178.806-20";
  const cpf = Cpf.create(inputValue);
  expect(cpf.value).toBe(inputValue);
});

test("cant create cpf when digits are not 11", () => {
  expect(() => Cpf.create("")).toThrowError(
    new CpfException(CpfExceptionType.INVALID_LENGTH)
  );
  expect(() => Cpf.create("123")).toThrowError(
    new CpfException(CpfExceptionType.INVALID_LENGTH)
  );
  expect(() => Cpf.create("123456789123")).toThrowError(
    new CpfException(CpfExceptionType.INVALID_LENGTH)
  );
  expect(() => Cpf.create("283.089.509-655")).toThrowError(
    new CpfException(CpfExceptionType.INVALID_LENGTH)
  );
});

test("cant create cpf when digits are all equal", () => {
  expect(() => Cpf.create("111.111.111-11")).toThrowError(
    new CpfException(CpfExceptionType.ALL_DIGITS_EQUAL)
  );
  expect(() => Cpf.create("222.222.222-22")).toThrowError(
    new CpfException(CpfExceptionType.ALL_DIGITS_EQUAL)
  );
});

test("cant create cpf when verifying digits are invalid", () => {
  expect(() => Cpf.create("516.178.806-21")).toThrowError(
    new CpfException(CpfExceptionType.INVALID_CPF)
  );
});
