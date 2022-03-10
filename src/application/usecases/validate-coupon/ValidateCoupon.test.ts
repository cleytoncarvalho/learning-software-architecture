import { CouponRepositoryMemory } from "../../../infra/repositories/CouponRepositoryMemory";
import { ValidateCoupon } from "./ValidateCoupon";

const sut = () => {
  const couponRepository = new CouponRepositoryMemory();
  return new ValidateCoupon(couponRepository);
};

test("validate coupon", async () => {
  const validateCoupon = sut();
  const output = await validateCoupon.execute({
    code: "VALE10",
    currentDate: new Date("2022-02-20T10:00:00"),
  });
  expect(output.isValid).toBe(true);
});

test("validate coupon expired", async () => {
  const validateCoupon = sut();
  const output = await validateCoupon.execute({
    code: "VALE30",
    currentDate: new Date("2022-02-20T10:00:00"),
  });
  expect(output.isValid).toBe(false);
});

test("validate coupon not found", async () => {
  const validateCoupon = sut();
  const output = await validateCoupon.execute({
    code: "VALE40",
    currentDate: new Date("2022-02-20T10:00:00"),
  });
  expect(output.isValid).toBe(false);
});
