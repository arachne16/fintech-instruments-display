const { Pool } = require('pg')

const pool = new Pool({
  user: process.env.db_usr || 'postgres',
  host: process.env.db_host || 'localhost', // Default to localhost if not running in Docker
  database: process.env.db_name || 'finance',
  password: process.env.db_pwd || 'postgres',
  port: process.env.db_port || 5432,
})

module.exports = pool
