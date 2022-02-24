import { CouponRepositoryMemory } from "../../../infra/repositories/CouponRepositoryMemory";
import { ValidateCoupon } from "./ValidateCoupon";

test("validate coupon", () => {
  const couponRepository = new CouponRepositoryMemory();
  const validateCoupon = new ValidateCoupon(couponRepository);
  const output = validateCoupon.execute({
    code: "VALE10",
    currentDate: new Date("2022-02-20T10:00:00"),
  });
  expect(output.isValid).toBe(true);
});

test("validate coupon expired", () => {
  const couponRepository = new CouponRepositoryMemory();
  const validateCoupon = new ValidateCoupon(couponRepository);
  const output = validateCoupon.execute({
    code: "VALE30",
    currentDate: new Date("2022-02-20T10:00:00"),
  });
  expect(output.isValid).toBe(false);
});

test("validate coupon not found", () => {
  const couponRepository = new CouponRepositoryMemory();
  const validateCoupon = new ValidateCoupon(couponRepository);
  const output = validateCoupon.execute({
    code: "VALE40",
    currentDate: new Date("2022-02-20T10:00:00"),
  });
  expect(output.isValid).toBe(false);
});
