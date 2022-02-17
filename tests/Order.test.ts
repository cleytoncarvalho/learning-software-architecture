import { Order } from "../src/Order";
import { Item } from "../src/Item";
import { Coupon } from "../src/Coupon";
import { InvalidCpfException } from "../src/CpfExceptions";
import { ExpiredCouponException } from "../src/CouponExceptions";

test("cant create order with invalid cpf", () => {
  expect(() => new Order({ cpf: "111.111.111-11" })).toThrowError(
    InvalidCpfException
  );
});

test("create order with 3 items", () => {
  const order = new Order({ cpf: "283.089.509-65" });
  order.addItem(new Item({ itemId: 1, description: "test", price: 20 }), 2);
  order.addItem(new Item({ itemId: 2, description: "test", price: 30 }), 3);
  order.addItem(new Item({ itemId: 3, description: "test", price: 25 }), 1);
  expect(order.orderItems).toHaveLength(3);
  expect(order.subtotal).toBe(155);
  expect(order.total).toBe(165);
});

test("create order with 3 items and discount coupon", () => {
  const order = new Order({ cpf: "283.089.509-65" });
  order.addItem(new Item({ itemId: 1, description: "test", price: 10 }), 1);
  order.addItem(new Item({ itemId: 2, description: "test", price: 20 }), 2);
  order.addItem(new Item({ itemId: 3, description: "test", price: 30 }), 1);
  order.addCoupon(
    new Coupon({ code: "PROMOCAO", percentage: 10, expirationDate: new Date() })
  );
  expect(order.discount).toBe(8);
  expect(order.subtotal).toBe(80);
  expect(order.total).toBe(82);
});

test("cant add expired dicount coupon", () => {
  const order = new Order({ cpf: "283.089.509-65" });
  order.addItem(new Item({ itemId: 1, description: "test", price: 10 }), 1);
  expect(() =>
    order.addCoupon(
      new Coupon({
        code: "PROMOCAO",
        percentage: 10,
        expirationDate: new Date(2022, 1, 14),
      })
    )
  ).toThrowError(ExpiredCouponException);
});

test("calculate shipping price", () => {
  const order = new Order({ cpf: "283.089.509-65" });
  order.addItem(
    new Item({
      itemId: 1,
      description: "test",
      price: 10,
      height: 20,
      width: 15,
      depth: 10,
      weight: 1,
    }),
    1
  );
  order.addItem(
    new Item({
      itemId: 1,
      description: "test",
      price: 10,
      height: 100,
      width: 30,
      depth: 10,
      weight: 3,
    }),
    2
  );
  expect(order.shipping).toBe(69.99);
  expect(order.subtotal).toBe(30);
  expect(order.total).toBe(99.99);
});

test("minimunm shipping price is 10", () => {
  const order = new Order({ cpf: "283.089.509-65" });
  order.addItem(
    new Item({
      itemId: 1,
      description: "test",
      price: 10,
      height: 5,
      width: 8,
      depth: 20,
      weight: 0.5,
    }),
    1
  );
  expect(order.shipping).toBe(10);
  expect(order.subtotal).toBe(10);
  expect(order.total).toBe(20);
});
