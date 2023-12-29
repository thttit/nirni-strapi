const path = require("path");

module.exports = ({ env }) => ({
  connection: {
    client: "postgres",
    connection: {
      host: env(
        "DATABASE_HOST",
        "nirni-database.cbyiukdfzhok.ap-southeast-1.rds.amazonaws.com"
      ),
      port: env.int("DATABASE_PORT", 5432),
      database: env("DATABASE_NAME", "nirni-database"),
      user: env("DATABASE_USERNAME", "postgres"),
      password: env("DATABASE_PASSWORD", "nirnishop000"),
      ssl: true,
    },
    // connection: {
    //   host: env(
    //     "DATABASE_HOST",
    //     "nirni-database.cbyiukdfzhok.ap-southeast-1.rds.amazonaws.com"
    //   ),
    //   port: env.int("DATABASE_PORT", 5432),
    //   database: env("DATABASE_NAME", "nirni-database"),
    //   user: env("DATABASE_USERNAME", "postgres"),
    //   password: env("DATABASE_PASSWORD", "nirnishop000"),
    // },
    useNullAsDefault: true,
  },
});
