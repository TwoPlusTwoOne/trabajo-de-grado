
var express = require('express');
var app = express();
var conString = "postgres://glwiuwlhjwmqqo:474e0f0aaf3f47f6d09b7738232f97430869cac957e16ae8404edd3ea8770c60@ec2-23-21-171-25.compute-1.amazonaws.com:5432/d7qm3v80l8bmvr";

const bodyParser = require('body-parser')
app.use( bodyParser.json() );
app.use(express.json());

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
    const result = await execQuery('SELECT * FROM users_table')
    res.send(result);
})

app.get('/user/:userId', async function(req, res) {
  const userId = req.params.userId
  const result = await execQuery(`SELECT * FROM users_table WHERE id = ${userId}`)
  res.send(result);
});

app.post('/login', async function(req, res) {
  const userEmail = req.body.email;
  const userPassword = req.body.password;
  const result = await execQuery(`SELECT * FROM users_table WHERE email = '${userEmail}' AND password = '${userPassword}'`)
  res.send(result);
});


app.post('/register', async function(req, res) {
  const userEmail = req.body.email;
  const userPassword = req.body.password;
  await execQuery(`INSERT INTO users_table (email, password) VALUES ('${userEmail}','${userPassword}')`)
  const result = await execQuery(`SELECT * FROM users_table WHERE email = '${userEmail}' AND password = '${userPassword}'`)
  res.send(result);
});


var route, routes = [];

app._router.stack.forEach(function(middleware){
    if(middleware.route){ // routes registered directly on the app
        routes.push(middleware.route);
    } else if(middleware.name === 'router'){ // router middleware 
        middleware.handle.stack.forEach(function(handler){
            route = handler.route;
            route && routes.push(route);
        });
    }
});

app.get('/', async (req, res) => {
  const routesString = routes.map(function(temp){
    var methods = "";
    for(var method in temp.methods){
      methods += method + ",";
    }
    methods = methods.slice(0, -1)
    return `<div style="margin-bottom:2em">${temp.path}: ${methods}</div>`;
  });
  res.send(routesString.reduce((acc, s) => acc + s));
})

app.listen(3001, function () {
  console.log('Example app listening on port 3001!');
});
