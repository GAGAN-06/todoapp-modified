import { Pool } from "pg";

const pool = new Pool({
  user: "nextjs_214b_user",
  host: "dpg-csur0252ng1s73dop2v0-a.virginia-postgres.render.com",
  database: "nextjs_214b",
  password: "lcZHTg0JR557CVJAuYvncPSGQYlfZw2v",
  port: 5432,
  ssl: true,
});

export async function query(text: string, params?: any[]) {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result;
  } finally {
    client.release();
  }
}