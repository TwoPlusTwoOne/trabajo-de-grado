import { UserBuilder } from './builders/UserBuilder'
import { insertAdmin } from './dbModules/AdminModule';
import { insertUser } from './dbModules/UsersModule'
import { insertClient, getClientByID } from './dbModules/ClientModule'
import { getAllProducts } from './dbModules/ProductModule'
import { Request, Response } from 'express';
import { Client } from './entities/Client'
import { Admin } from './entities/Admin'
import { boot } from './boot'
import { getCartByClientId } from './dbModules/CartModule'
import {getProductQuestionAnswer}  from './dbModules/QuestionAnswerModule'
import { Question } from './entities/Question';
import { insertQuestion } from './dbModules/QuestionsModule';


var express = require('express');
var app = express();
var conString = "postgres://glwiuwlhjwmqqo:474e0f0aaf3f47f6d09b7738232f97430869cac957e16ae8404edd3ea8770c60@ec2-23-21-171-25.compute-1.amazonaws.com:5432/d7qm3v80l8bmvr";

const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: conString,
  ssl: true
})


const execQuery = async (query: string) => {
  try {
    const client = await pool.connect()
    const result = await client.query(query);
    const results = { 'results': (result) ? result.rows : null };
    client.release();
    return results
  } catch (err) {
    console.error(err);
    return "Error " + err
  }
}


app.get('/user', async (req: Request, res: Response) => {
  const result = await execQuery('SELECT * FROM user_table')
  res.send(result);
})

app.get('/user/:userId', async function (req: Request, res: Response) {
  const userId = req.params.userId
  const result = await execQuery(`SELECT * FROM user_table WHERE id = ${userId}`)
  res.send(result);
});

app.post('/login', async function (req: Request, res: Response) {
  const userEmail = req.body.email;
  const userPassword = req.body.password;
  const result = await execQuery(`SELECT * FROM user_table WHERE email = '${userEmail}' AND password = '${userPassword}'`)
  res.send(result);
});

app.post('/boot', async function (req: Request, res: Response) {
  boot(pool).then(() => {
    res.sendStatus(200)
  })
});

const getUserFromRequest = (req: Request) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName
  const direction = req.body.direction
  const dni = req.body.dni
  const password = req.body.password
  const email = req.body.email
  const birthdate = req.body.birthdate
  const user = new UserBuilder()
    .withFirstName(firstName)
    .withLastName(lastName)
    .withDirection(direction)
    .withDni(dni)
    .withPassword(password)
    .withEmail(email)
    .withBirthDate(birthdate)
    .build()
  return user
}

const getClientFromRequest = (req: Request) => {
  const sellerCalification = req.body.sellerCalification;
  const client = <Client> getUserFromRequest(req)
  client.sellerCalification = sellerCalification
  return client
}

app.post('/user', async function (req: Request, res: Response) {
  const user = getUserFromRequest(req)
  const userID: string = await insertUser(pool, user)
  res.send(JSON.stringify({ id: userID }))
});


app.post('/admin', async function (req: Request, res: Response) {
  const admin = <Admin> getUserFromRequest(req)
  const userID: string = await insertAdmin(pool, admin)
  res.send(JSON.stringify({ id: userID }))
});

app.post('/client', async function (req: Request, res: Response) {
  const user = getClientFromRequest(req)
  const clientID: string = await insertClient(pool, user)
  res.send(JSON.stringify({ id: clientID }))
});

app.get('/client/:clientId', async function (req: Request, res: Response) {
  const clientId = req.params.clientId
  const client = await getClientByID(pool, clientId)
  res.send(client)
});

app.get('/client/cart/:clientId', async function (req: Request, res: Response) {
  const clientId = req.params.clientId
  const client = await getCartByClientId(pool, clientId)
  res.send(client)
});

app.get('/product', async function (req: Request, res: Response) {
  const results = await getAllProducts(pool)
  res.send(results)
});


app.get('/qa/:productId', async function (req: Request, res: Response) {
  const productId = req.params.productId
  console.log(`Product id: ${productId}`)
  const client = await getProductQuestionAnswer(pool, productId)
  res.send(client)
});

const getQuestionFromRequest = (req: Request) => {
  return new Question("", req.body.productId, req.body.question, req.body.userId)
}

app.post('/question', async function (req: Request, res: Response) {
  const question = getQuestionFromRequest(req)
  const questionId: string = await insertQuestion(pool, question)
  res.send(JSON.stringify({ id: questionId }))
});
app.listen(3001, function () {
  console.log('Server started');
});