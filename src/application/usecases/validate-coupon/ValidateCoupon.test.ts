import { PostgreSQLConnectionAdapter } from "../../../infra/database/adapters/PostgreSQLConnectionAdapter";
import { CouponRepositoryDatabase } from "../../../infra/repositories/database/CouponRepositoryDatabase";
import { ValidateCoupon } from "./ValidateCoupon";

const postgreSQLConnectionAdapter = new PostgreSQLConnectionAdapter();
const couponRepository = new CouponRepositoryDatabase(
  postgreSQLConnectionAdapter
);

test("validate coupon", async () => {
  const validateCoupon = new ValidateCoupon(couponRepository);
  const output = await validateCoupon.execute({
    code: "VALE20",
    currentDate: new Date("2022-10-10T10:00:00"),
  });
  expect(output.isValid).toBe(true);
});

test("validate coupon expired", async () => {
  const validateCoupon = new ValidateCoupon(couponRepository);
  const output = await validateCoupon.execute({
    code: "VALE20_EXPIRED",
    currentDate: new Date("2022-10-10T10:00:00"),
  });
  expect(output.isValid).toBe(false);
});

afterAll(async () => {
  await postgreSQLConnectionAdapter.close();
});
