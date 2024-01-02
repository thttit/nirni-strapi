module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  // url: "https://nirnioffice.com",
  app: {
    keys: env.array("APP_KEYS"),
  },
  webhooks: {
    populateRelations: env.bool("WEBHOOKS_POPULATE_RELATIONS", true),
  },
  server: {
    ssl: {
      enabled: true,
      redirectHttpFromPort: 80,
      httpPort: 1337,
      cert: env("SSL_CERT", ""),
      key: env("SSL_KEY", ""),
    },
  },
});
