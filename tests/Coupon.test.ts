import { Coupon, CouponProps } from "../src/Coupon";

test("create a coupon", () => {
  const couponProps: CouponProps = {
    code: "PROMO10",
    percentage: 10,
  };
  const coupon = new Coupon(couponProps);
  expect(coupon.code).toBe(couponProps.code);
  expect(coupon.percentage).toBe(couponProps.percentage);
  expect(coupon.isExpired(new Date())).toBe(false);
});

test("create a coupon with expiration date", () => {
  const couponProps: CouponProps = {
    code: "PROMO10",
    percentage: 10,
    expirationDate: new Date("2022-02-23T10:00:00"),
  };
  const coupon = new Coupon(couponProps);
  expect(coupon.isExpired(new Date("2022-02-21T10:00:00"))).toBe(false);
});

test("create a expired coupon", () => {
  const couponProps: CouponProps = {
    code: "PROMO10",
    percentage: 10,
    expirationDate: new Date("2022-02-22T10:00:00"),
  };
  const coupon = new Coupon(couponProps);
  expect(coupon.isExpired(new Date("2022-02-22T11:00:00"))).toBe(true);
});
