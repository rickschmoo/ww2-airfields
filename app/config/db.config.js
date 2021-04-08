module.exports = {
  HOST: process.env.MYSQL_SERVER,
  USER: process.env.MYSQL_USER,
  PASSWORD: process.env.MYSQL_PWD,
  DB: process.env.MYSQL_DB,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
