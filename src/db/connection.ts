import { DataSource } from "typeorm";
import { config } from "dotenv";
import { User } from "./schema/user.schema";
import { Tenant1 } from "./schema/tenet1.schema";
config();
export const source = new DataSource({
  type: "postgres",
  host: process.env.PGHOST,
  port: 5432,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  ssl: true,
  entities: [User, Tenant1],
  synchronize: true,
  logging: true,
  // // Extra settings
  // extra: {
  //   // Connection pool settings
  //   max: 10, // Maximum connections in the pool
  //   min: 2, // Minimum connections in the pool
  //   idleTimeoutMillis: 30000, // Time (in milliseconds) before idle clients are closed
  //   connectionTimeoutMillis: 2000, // Time (in milliseconds) before giving up on getting a connection from pool
  // },
});
