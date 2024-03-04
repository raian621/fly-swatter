import ViteExpress from "vite-express";
import { migrateDB } from "./migrate.js";
import { guaranteeAdminUser } from "./database.js";
import { app } from "./app.js";

await migrateDB();
await guaranteeAdminUser();

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
