// Update with your config settings.

module.exports = {

  development: {
    client: "pg",
    connection: "postgres://localhost/museo_talk",
    migrations: {
      directory: "./db/migrations"
    },
    seeds: {
      directory: "./db/seeds/dev"
    },
    useNullAsDefault: true
  },

  production: {
    client: "pg",
    connection: {
      database: "museo_talk",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }, test: {
    client: "pg",
    connection: "postgres://localhost/museo_talk",
    migrations: {
      directory: "./db/migrations"
    },
    seeds: {
      directory: "./db/seeds/test"
    },
    useNullAsDefault: true
  }

};
