const { Pool } = require('pg');

const client = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'details',
  password: 'root123',
  port: 5432, 
});

client.connect()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((err) => {
    console.error('Error connecting to the database', err);
  });

module.exports = client; 

