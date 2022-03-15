import { RepositoryMemoryFactory } from "../../../infra/repositories/RepositoryMemoryFactory";
import { PlaceOrder } from "./PlaceOrder";

const repositoryFactory = new RepositoryMemoryFactory();

const sut = () => {
  return new PlaceOrder(repositoryFactory);
};

test("place order and calculate code", async () => {
  const placeOrder = sut();
  const output = await placeOrder.execute({
    issueDate: new Date("2021-03-09T10:00:00"),
    cpf: "516.178.806-20",
    orderItems: [
      { itemId: 1, quantity: 1 },
      { itemId: 3, quantity: 2 },
    ],
    coupon: "VALE20",
  });
  expect(output.code).toBe("202100000002");
});

test("place order and calculate total", async () => {
  const placeOrder = sut();
  const output = await placeOrder.execute({
    issueDate: new Date("2021-03-09T10:00:00"),
    cpf: "516.178.806-20",
    orderItems: [
      { itemId: 1, quantity: 1 },
      { itemId: 2, quantity: 1 },
    ],
  });
  expect(output.total).toBe(6250);
});

test("place order with coupon", async () => {
  const placeOrder = sut();
  const output = await placeOrder.execute({
    issueDate: new Date("2021-03-09T10:00:00"),
    cpf: "516.178.806-20",
    orderItems: [
      { itemId: 1, quantity: 1 },
      { itemId: 3, quantity: 2 },
    ],
    coupon: "VALE20",
  });
  expect(output.total).toBe(898);
});

test("cant place order with repeated item", async () => {
  expect.assertions(1);
  try {
    await sut().execute({
      issueDate: new Date("2021-03-09T10:00:00"),
      cpf: "516.178.806-20",
      orderItems: [
        { itemId: 1, quantity: 1 },
        { itemId: 1, quantity: 2 },
      ],
      coupon: "VALE20",
    });
  } catch (error) {
    expect(error).toBeTruthy();
  }
});
