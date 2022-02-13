import crypto from "crypto";
import { Order, OrderProps } from "./order";
import { Product, ProductProps } from "./product";
import { InvalidCpfException } from "./cpf-exceptions";

const sut = (props: Partial<OrderProps> = {}): Order => {
  const products = [generateFakeProduct()];
  return new Order({ cpf: "283.089.509-65", products, ...props });
};

const generateFakeProduct = (props: Partial<ProductProps> = {}): Product => {
  return new Product({
    description: generateFakeString(),
    price: 10,
    quantity: 1,
    ...props,
  });
};

const generateFakeString = () => {
  return crypto.randomBytes(10).toString("hex");
};

test("can not make order with invalid cpf", () => {
  expect(() => sut({ cpf: "" })).toThrowError(InvalidCpfException);
  expect(() => sut({ cpf: "123456789" })).toThrowError(InvalidCpfException);
  expect(() => sut({ cpf: "00000000000" })).toThrowError(InvalidCpfException);
  expect(() => sut({ cpf: "11111111111" })).toThrowError(InvalidCpfException);
  expect(() => sut({ cpf: "283.089.509-64" })).toThrowError(
    InvalidCpfException
  );
});

test("make order with 3 products", () => {
  const products = [
    generateFakeProduct({ price: 20, quantity: 2 }),
    generateFakeProduct({ price: 10, quantity: 1 }),
    generateFakeProduct({ price: 25, quantity: 3 }),
  ];
  const order = sut({ products });
  expect(order.products).toStrictEqual(products);
  expect(order.subtotal).toBe(125);
  expect(order.total).toBe(125);
});

test("make order with discount coupon", () => {
  const products = [generateFakeProduct({ price: 50, quantity: 3 })];
  const order = sut({ products, discountPercentage: 10 });
  expect(order.discount).toBe(15);
  expect(order.subtotal).toEqual(150);
  expect(order.total).toEqual(135);
});
