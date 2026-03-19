import { Sequelize } from "sequelize";

 const sequlize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
{
  host: process.env.DB_HOST,
  dialect:"postgres",
  logging: false,
});

export default sequlize;