import pgp from "pg-promise";
import { Connection } from "../Connection";

export class PostgreSQLConnectionAdapter implements Connection {
  readonly connection: any;

  constructor() {
    this.connection = pgp()("postgres://postgres:admin@localhost:5432/branas");
  }

  async query(statement: string, params: any): Promise<any> {
    return await this.connection.query(statement, params);
  }

  async close(): Promise<void> {
    await this.connection.$pool.end();
  }
}
