import { Order } from "./Order";
import { Item } from "./Item";
import { Coupon } from "./Coupon";
import { InvalidCpfException } from "./CpfExceptions";
import { ExpiredCouponException } from "./CouponExceptions";

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
  expect(order.total).toBe(155);
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
  expect(order.total).toBe(72);
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
