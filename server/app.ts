
var express = require('express');
var app = express();
var conString = "postgres://glwiuwlhjwmqqo:474e0f0aaf3f47f6d09b7738232f97430869cac957e16ae8404edd3ea8770c60@ec2-23-21-171-25.compute-1.amazonaws.com:5432/d7qm3v80l8bmvr";


const { Pool } = require('pg');
const pool = new Pool({
  connectionString: conString,
  ssl: true
});

const execQuery = async (query) => {
  try{
    const client = await pool.connect()
    const result = await client.query(query);
    const results = { 'results': (result) ? result.rows : null};
    client.release();
    return results
  } catch (err) {
    console.error(err);
    return "Error " + err
  }
}

app.get('/user', async (req, res) => {
    const result = await execQuery('SELECT * FROM test_table')
    res.send(result);
})

app.get('/user/:userId', async function(req, res) {
  const userId = req.params.userId
  const result = await execQuery(`SELECT * FROM test_table WHERE id = ${userId}`)
  res.send(result);
});

app.listen(3001, function () {
  console.log('Example app listening on port 3001!');
});