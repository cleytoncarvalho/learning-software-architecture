import { OrderCode } from "./OrderCode";

test("create order code", () => {
  const date = new Date("2021-03-09T10:00:00");
  const sequence = 1;
  const orderCode = OrderCode.create(date, sequence);
  expect(orderCode.value).toBe("202100000001");
});
