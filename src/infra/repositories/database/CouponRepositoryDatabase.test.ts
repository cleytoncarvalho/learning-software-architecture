import { PostgreSQLConnectionAdapter } from "../../database/adapters/PostgreSQLConnectionAdapter";
import { CouponRepositoryDatabase } from "./CouponRepositoryDatabase";

test("get coupon by code using PostgreSQL", async () => {
  const postgreSQLConnectionAdapter = new PostgreSQLConnectionAdapter();
  const couponRepositoryDatabase = new CouponRepositoryDatabase(
    postgreSQLConnectionAdapter
  );
  const coupon = await couponRepositoryDatabase.getByCode("VALE20");
  postgreSQLConnectionAdapter.close();
  expect(coupon?.code).toBe("VALE20");
  expect(coupon?.percentage).toBe(20);
  expect(coupon?.expirationDate).toStrictEqual(new Date("2050-10-10T10:00:00"));
});
