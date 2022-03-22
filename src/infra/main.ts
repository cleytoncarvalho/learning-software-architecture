import { PostgreSQLConnectionAdapter } from "./database/adapters/PostgreSQLConnectionAdapter";
import { RepositoryDatabaseFactory } from "./repositories/database/RepositoryDatabaseFactory";
import { ExpressHttp } from "./http/ExpressHttp";
import { Router } from "./http/Router";

const connection = new PostgreSQLConnectionAdapter();
const repositoryFactory = new RepositoryDatabaseFactory(connection);
const http = new ExpressHttp();
const router = new Router(http, repositoryFactory);
router.init();
http.listen(3000);
