import { PostgreSQLConnectionAdapter } from "../database/adapters/PostgreSQLConnectionAdapter";
import { ItemRepositoryDatabase } from "./ItemRepositoryDatabase";

test("get item by id using PostgreSQL", async () => {
  const postgreSQLConnectionAdapter = new PostgreSQLConnectionAdapter();
  const itemRepositoryDatabase = new ItemRepositoryDatabase(
    postgreSQLConnectionAdapter
  );
  const item = await itemRepositoryDatabase.getById(1);
  postgreSQLConnectionAdapter.close();
  expect(item?.itemId).toBe(1);
  expect(item?.category).toBe("Instrumentos Musicais");
  expect(item?.description).toBe("Guitarra");
  expect(item?.price).toBe(1000);
  expect(item?.width).toBe(100);
  expect(item?.height).toBe(50);
  expect(item?.depth).toBe(15);
  expect(item?.weight).toBe(3);
});
