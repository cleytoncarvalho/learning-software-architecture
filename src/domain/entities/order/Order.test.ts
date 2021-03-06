import { Order, OrderProps } from "./Order";
import { Item, ItemProps } from "../item/Item";
import { Coupon } from "../coupon/Coupon";
import { CpfException } from "../cpf/CpfExceptions";
import {
  CouponException,
  CouponExceptionType,
} from "../coupon/CouponExceptions";

const sut = (props: Partial<OrderProps> = {}) => {
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

const itemFactory = (props: Partial<ItemProps> = {}): Item => {
  return new Item({
    itemId: 1,
    category: "test",
    description: "test",
    price: 10,
    ...props,
  });
};

test("cant create order with invalid cpf", () => {
  expect(() => sut({ cpf: "283.089.509-61" })).toThrowError(CpfException);
});

test("create order with 3 items", () => {
  const { order, orderProps } = sut();
  order.addItem({
    item: itemFactory({ itemId: 1, price: 20 }),
    quantity: 2,
  });
  order.addItem({ item: itemFactory({ itemId: 2, price: 30 }), quantity: 3 });
  order.addItem({ item: itemFactory({ itemId: 3, price: 25 }), quantity: 1 });
  expect(order.cpf.value).toBe(orderProps.cpf);
  expect(order.issueDate.getTime()).toBe(orderProps.issueDate.getTime());
  expect(order.orderItems).toHaveLength(3);
  expect(order.subtotal).toBe(155);
  expect(order.total).toBe(165);
});

test("create order code with year and sequencial number", () => {
  const { order } = sut({
    issueDate: new Date("2021-01-01T10:00:00"),
    sequence: 3,
  });
  order.addItem({ item: itemFactory({ price: 30 }), quantity: 3 });
  expect(order.code.value).toBe("202100000003");
});

test("create order with 3 items and discount coupon", () => {
  const order = sut().order;
  order.addItem({ item: itemFactory({ itemId: 1, price: 10 }), quantity: 1 });
  order.addItem({ item: itemFactory({ itemId: 2, price: 20 }), quantity: 2 });
  order.addItem({ item: itemFactory({ itemId: 3, price: 30 }), quantity: 1 });
  order.addCoupon(new Coupon({ code: "PROMOCAO", percentage: 10 }));
  expect(order.discount).toBe(8);
  expect(order.subtotal).toBe(80);
  expect(order.total).toBe(82);
});

test("cant add expired dicount coupon", () => {
  const order = sut().order;
  order.addItem({ item: itemFactory({ price: 10 }), quantity: 1 });
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
  order.addItem({
    item: itemFactory({
      itemId: 1,
      height: 20,
      width: 15,
      depth: 10,
      weight: 1,
    }),
    quantity: 1,
  });
  order.addItem({
    item: itemFactory({
      itemId: 2,
      height: 100,
      width: 30,
      depth: 10,
      weight: 3,
    }),
    quantity: 2,
  });
  expect(order.shipping).toBe(69.99);
  expect(order.subtotal).toBe(30);
  expect(order.total).toBe(99.99);
});

test("minimunm shipping price is 10", () => {
  const order = sut().order;
  order.addItem({
    item: itemFactory({ height: 100, width: 30, depth: 10, weight: 0.5 }),
    quantity: 1,
  });
  expect(order.shipping).toBe(10);
  expect(order.subtotal).toBe(10);
  expect(order.total).toBe(20);
});
