import { Cpf } from "./cpf";
import { InvalidCpfException } from "./CpfExceptions";

test("cant create cpf when digits are empty", () => {
  expect(() => Cpf.create("")).toThrowError(InvalidCpfException);
});

test("cant create cpf when total digits are not 11", () => {
  expect(() => Cpf.create("123")).toThrowError(InvalidCpfException);
  expect(() => Cpf.create("123456789123")).toThrowError(InvalidCpfException);
  expect(() => Cpf.create("283.089.509-655")).toThrowError(InvalidCpfException);
});

test("cant create cpf when digits are all equal", () => {
  expect(() => Cpf.create("111.111.111-11")).toThrowError(InvalidCpfException);
  expect(() => Cpf.create("222.222.222-22")).toThrowError(InvalidCpfException);
});

test("create cpf", () => {
  const cpf = Cpf.create("516.178.806-20");
  expect(cpf.value).toBe("516.178.806-20");
});
