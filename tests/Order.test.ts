import { Order, OrderProps } from "../src/Order";
import { Item } from "../src/Item";
import { Coupon } from "../src/Coupon";
import { CpfException } from "../src/CpfExceptions";
import { CouponException, CouponExceptionType } from "../src/CouponExceptions";

interface SutOutput {
  order: Order;
  orderProps: OrderProps;
}

const sut = (props: Partial<OrderProps> = {}): SutOutput => {
  const orderProps: OrderProps = {
    cpf: "283.089.509-65",
    issueDate: new Date("2022-02-22T10:00:00"),
    ...props,
  };

  return {
    order: new Order(orderProps),
    orderProps,
  };
};

test("cant create order with invalid cpf", () => {
  expect(() => sut({ cpf: "283.089.509-61" })).toThrowError(CpfException);
});

test("create order with 3 items", () => {
  const order = sut().order;
  order.addItem(new Item({ itemId: 1, description: "test", price: 20 }), 2);
  order.addItem(new Item({ itemId: 2, description: "test", price: 30 }), 3);
  order.addItem(new Item({ itemId: 3, description: "test", price: 25 }), 1);
  expect(order.cpf.value).toBe(sut().orderProps.cpf);
  expect(order.issueDate.getTime()).toBe(sut().orderProps.issueDate.getTime());
  expect(order.orderItems).toHaveLength(3);
  expect(order.subtotal).toBe(155);
  expect(order.total).toBe(165);
});

test("create order with 3 items and discount coupon", () => {
  const order = sut().order;
  order.addItem(new Item({ itemId: 1, description: "test", price: 10 }), 1);
  order.addItem(new Item({ itemId: 2, description: "test", price: 20 }), 2);
  order.addItem(new Item({ itemId: 3, description: "test", price: 30 }), 1);
  order.addCoupon(new Coupon({ code: "PROMOCAO", percentage: 10 }));
  expect(order.discount).toBe(8);
  expect(order.subtotal).toBe(80);
  expect(order.total).toBe(82);
});

test("cant add expired dicount coupon", () => {
  const order = sut().order;
  order.addItem(new Item({ itemId: 1, description: "test", price: 10 }), 1);
  const coupon = new Coupon({
    code: "PROMOCAO",
    percentage: 10,
    expirationDate: new Date("2022-02-21T10:00:00"),
  });
  expect(() => order.addCoupon(coupon)).toThrowError(
    new CouponException(CouponExceptionType.COUPON_EXPIRED)
  );
});

test("calculate shipping price", () => {
  const order = sut().order;
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
  const order = sut().order;
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
