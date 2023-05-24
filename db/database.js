import mysql from "mysql2";
import { config } from "../config.js";
import SQ from "sequelize";

const { host, user, database, password } = config.db;
export const sequelize = new SQ.Sequelize(database, user, password, {
  host,
  dialect: "mysql",
});

//createPool을 통해 mysql 서버에 접속가능
const pool = mysql.createPool({
  host,
  user,
  database,
  password,
});

//비동기적으로 사용하길 원하니까 비동기버전을 export
export const db = pool.promise();
