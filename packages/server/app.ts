import { UserBuilder } from './builders/UserBuilder'
import { insertAdmin, getAdminByID, loginAdmin } from './dbModules/AdminModule';
import { insertUser } from './dbModules/UsersModule'
import { insertClient, getClientByID, loginClient } from './dbModules/ClientModule'
import { getAllProducts, getProductByID } from './dbModules/ProductModule'
import { Request, Response } from 'express';
import { Client } from './entities/Client'
import { Admin } from './entities/Admin'
import { boot } from './boot'
import { getCartByClientId, insertCart } from './dbModules/CartModule'
import {getProductQuestionAnswer}  from './dbModules/QuestionAnswerModule'
import { Question } from './entities/Question';
import { insertQuestion } from './dbModules/QuestionsModule';
import { Cart } from './entities/Cart';
import { Product } from './entities/Product';
import {PublicationImage} from './entities/PublicationImage'
import { Review } from './entities/Review';
import { getPublicationByID, getAllPublications } from './dbModules/PublicationModule';


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

const getUserFromRequest = (json: any) => {
  const firstName = json.firstName;
  const lastName = json.lastName
  const direction = json.direction
  const dni = json.dni
  const password = json.password
  const email = json.email
  const birthdate = json.birthdate
  const id = json.id === undefined ?   "" : json.id

  const user = new UserBuilder()
    .withFirstName(firstName)
    .withLastName(lastName)
    .withDirection(direction)
    .withDni(dni)
    .withPassword(password)
    .withEmail(email)
    .withBirthDate(birthdate)
    .withID(id)
    .build()
  return user
}

const getClientFromRequest = (json: any) => {
  const sellerCalification = json.sellerCalification;
  const client = <Client> getUserFromRequest(json)
  client.sellerCalification = sellerCalification
  return client
}


const getQuestionFromRequest = (json: any) => {
  return new Question("", json.productId, json.question, json.userId)
}

const getImagesFromRequest = (json: any) => {
  return json.map(i => new PublicationImage(i.id, i.image, i.productId))
}

const getReviewsFromRequest = (json: any) => {
  return json.map(r => new Review(r.id, getClientFromRequest(r.buyer), r.description, r.calification))
}

const getProductFromRequest = (json: any) => {
  const client = getClientFromRequest(json.client)
  const images = getImagesFromRequest(json.images)
  const reviews = getReviewsFromRequest(json.reviews)
  return new Product(json.id, json.name, json.value, json.description)
}

const getCartFromRequest = (json: any) => {
  const products = json.products.map(p => getProductFromRequest(p));
  return new Cart(json.id, json.clientId, products)
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

app.delete('/all', async function (req: Request, res: Response) {
  const client = await pool.connect()
  client.query(
    `DROP SCHEMA public CASCADE;
    CREATE SCHEMA public;`
    ).then((r) => res.send(r))
});

app.post('/user', async function (req: Request, res: Response) {
  const user = getUserFromRequest(req.body)
  const userID: string = await insertUser(pool, user)
  res.send(JSON.stringify({ id: userID }))
});


app.post('/admin', async function (req: Request, res: Response) {
  const admin = <Admin> getUserFromRequest(req.body)
  const userID: string = await insertAdmin(pool, admin)
  res.send(JSON.stringify({ id: userID }))
});

app.post('/client', async function (req: Request, res: Response) {
  const user = getClientFromRequest(req.body)
  const clientID: string = await insertClient(pool, user)
  res.send(JSON.stringify({ id: clientID }))
});

app.get('/client/:clientId', async function (req: Request, res: Response) {
  const clientId = req.params.clientId
  const client = await getClientByID(pool, clientId)
  res.send(client)
});

app.get('/admin/:adminId', async function (req: Request, res: Response) {
  const adminId = req.params.adminId
  const client = await getAdminByID(pool, adminId)
  res.send(client)
});

app.post('/admin/login', async function (req: Request, res: Response) {
  const email = req.body.email
  const password = req.body.password
  loginAdmin(pool, email, password).then((r) => {
    if(r.id !== null && r.id !== ""){
    res.send(r)
    } else {
      res.sendStatus(401)
    }
  })})

app.post('/client/login', async function (req: Request, res: Response) {
  const email = req.body.email
  const password = req.body.password
  loginClient(pool, email, password).then((r) => {
    if(r.id !== null && r.id !== ""){
    res.send(r)
    } else{
      res.sendStatus(401)
    }
  })})

app.get('/cart/:clientId', async function (req: Request, res: Response) {
  const clientId = req.params.clientId
  const cart = await getCartByClientId(pool, clientId)
  res.send(cart)
});

app.post('/cart', async function (req: Request, res: Response) {
  const cart = getCartFromRequest(req.body)
  const cartId: string = await insertCart(pool, cart)
  res.send(JSON.stringify({ id: cartId }))
});

app.get('/product', async function (req: Request, res: Response) {
  getAllProducts(pool).then((result) => res.send(result))
});

app.get('/product/:productId', async function (req: Request, res: Response) {
  const productId = req.params.productId
  getProductByID(pool, productId).then((result) => res.send(result))
});

app.get('/publication', async function (req: Request, res: Response) {
  getAllPublications(pool).then((result) => res.send(result))
});

app.get('/publication/:publicationId', async function (req: Request, res: Response) {
  const publicationId = req.params.publicationId
  getPublicationByID(pool, publicationId).then((result) => res.send(result))
});

app.get('/qa/:productId', async function (req: Request, res: Response) {
  const productId = req.params.productId
  const client = await getProductQuestionAnswer(pool, productId)
  res.send(client)
});

app.post('/question', async function (req: Request, res: Response) {
  const question = getQuestionFromRequest(req)
  const questionId: string = await insertQuestion(pool, question)
  res.send(JSON.stringify({ id: questionId }))
});
app.listen(3001, function () {
  console.log('Server started');
});