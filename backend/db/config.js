const config = {
    host: process.env.DB_INSTANCE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port:process.env.DB_PORT
  };
  
  module.exports = config;