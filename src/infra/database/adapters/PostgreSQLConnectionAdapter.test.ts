import { PostgreSQLConnectionAdapter } from "./PostgreSQLConnectionAdapter";

test("connect to postgreSQL database", async () => {
  const postgreSQLConnectionAdapter = new PostgreSQLConnectionAdapter();
  const result = await postgreSQLConnectionAdapter.query(
    "select * from ccca.item",
    []
  );
  await postgreSQLConnectionAdapter.close();
  expect(result).toHaveLength(3);
});
