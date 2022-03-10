import { PostgreSQLConnectionAdapter } from "./PostgreSQLConnectionAdapter";

test("connect to postgreSQL database", async () => {
  const postgreSQLConnectionAdapter = new PostgreSQLConnectionAdapter();
  const result = await postgreSQLConnectionAdapter.query(
    "select * from ccca.item",
    []
  );
  expect(result).toHaveLength(3);
  await postgreSQLConnectionAdapter.close();
});
