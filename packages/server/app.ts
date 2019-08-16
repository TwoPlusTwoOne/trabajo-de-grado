import { UserBuilder } from './builders/UserBuilder'

import { insertAdmin, getAdminByID, loginAdmin, updateAdmin, getAdminByUserId } from './dbModules/AdminModule'
import { insertUser, loginUser, deleteUser, validateEmail, getUserById } from './dbModules/UsersModule'
import { insertClient, getClientByID, loginClient, updateClient } from './dbModules/ClientModule'
import { getAllProducts, getProductByID } from './dbModules/ProductModule'
import { Request, Response, json } from 'express'
import { Client } from './entities/Client'
import { Admin } from './entities/Admin'
import { boot } from './boot'
import { getCartByClientId, insertCart, addPublicationToCart, removePublicationFromCart } from './dbModules/CartModule'
import { getProductQuestionAnswer } from './dbModules/QuestionAnswerModule'
import { Question } from './entities/Question'
import { insertQuestion } from './dbModules/QuestionsModule'
import { Cart } from './entities/Cart'
import { Answer } from './entities/Answer'
import { Product } from './entities/Product'
import { PublicationImage } from './entities/PublicationImage'
import { SellerReview } from './entities/SellerReview'
import {
  getPublicationByID,
  getAllPublications,
  deletePublication,
  updatePublication,
  insertPublication2,
} from './dbModules/PublicationModule'
import { Publication } from './entities/Pubilcation'
import { insertAnswer } from './dbModules/AnswerModule'
import { insertSale, getSale } from './dbModules/SaleModule'
import {
  getSellerReviewsForClient,
  getSellerReviewsForSeller,
  insertSellerReview,
} from './dbModules/SellerReviewModule'
import {
  insertProductReview,
  getProductReviewsForClient,
  getProductReviewsForProduct,
} from './dbModules/ProductReviewModule'
import { Role } from './entities/Role'

const moment = require('moment')
const express = require('express')
const cors = require('cors')
const app = express()
const conString = 'postgres://nijfsyvqxmsiaa:d594ac31f10a4f9d02cf6622c4db475e3ead98662b5e004e766bd8010c94653f@ec2-54-243-197-120.compute-1.amazonaws.com:5432/de0v9gd9q8nd3v'
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const key = require('./key')
const uuidv1 = require('uuid/v1')

app.use(bodyParser.json())
app.use(express.json())
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})
app.use(cors())

const irisNotAuthenticated = ['/client/login', '/admin/login', '/register', '/boot', '/all']
const tokens = []

app.use(function (req, res, next) {
  try {
    const iri = req.originalUrl
    if (irisNotAuthenticated.find(x => x === iri) !== undefined) {
      next()
    } else {
      const token = req.headers.authorization
      jwt.verify(token, key.tokenKey, function (err, payload) {
        if (payload && tokens.indexOf(payload.token) != -1) {
          next()
        } else {
          res.sendStatus(401)
        }
      })
    }
  } catch (e) {
    res.sendStatus(401)
  }
})

const { Pool } = require('pg')
const pool = new Pool({
  connectionString: conString,
  ssl: true,
})

const execQuery = async (query: string) => {
  try {
    const client = await pool.connect()
    const result = await client.query(query)
    const results = { 'results': (result) ? result.rows : null }
    client.release()
    return results
  } catch (err) {
    console.error(err)
    return 'Error ' + err
  }
}


const getUserBirthDate = (json: any) => {
  const locale = json.dateLocale || 'en'
  const format = json.dateFormat || 'YYYY-MM-DD'

  moment.locale(locale)
  return moment(json.birthdate).format(format)
}


const getUserFromRequest = (json: any) => {
  const firstName = json.first_name
  const lastName = json.last_name
  const direction = json.direction
  const dni = json.dni
  const password = json.password
  const email = json.email
  const birthdate = getUserBirthDate(json)
  const id = json.id === undefined ? '' : json.id

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
  const client = <Client>getUserFromRequest(json)
  client.sellerCalification = json.sellerCalification
  client.userID = json.userID
  return client
}

const getAdminFromRequest = (json: any) => {
  const admin = <Admin>getUserFromRequest(json)
  admin.role = getRoleFromRequest(json.role)
  admin.userID = json.userID
  return admin
}

const getRoleFromRequest = (json: any) => {
  return new Role(json.id, json.name, json.level)
}

const getQuestionFromRequest = (json: any) => {
  return new Question('', json.publicationId, json.question, json.userId)
}

const getAnswerFromRequest = (json: any) => {
  return new Answer('', json.questionId, json.answer, json.userId)
}

const getImagesFromRequest = (json: any) => {
  return json.map(i => new PublicationImage(i.id, i.image, i.productId))
}

const getReviewsFromRequest = (json: any) => {
  return json.map(r => new SellerReview(r.id, getClientFromRequest(r.buyer), getClientFromRequest(r.seller), r.description, r.calification))
}

const getProductFromRequest = (json: any) => {
  return new Product(json.id, json.name, json.value)
}

const getCartFromRequest = (json: any) => {
  const products = json.products.map(p => getProductFromRequest(p))
  return new Cart(json.id, json.clientId, products)
}

const getPublicationFromRequest = (json: any) => {
  const seller = getClientFromRequest(json.seller)
  const images = getImagesFromRequest(json.images)
  const product = getProductFromRequest(json.product)
  return new Publication(json.id, json.name, json.value, seller, images, product, json.description)
}

const generateToken = () => {
  const token = uuidv1()
  tokens.push(token)
  return jwt.sign({ token: token }, key.tokenKey, { expiresIn: '1h' })
}

app.post('/login', async function (req: Request, res: Response) {
  const userEmail = req.body.email
  const userPassword = req.body.password
  loginUser(pool, userEmail, userPassword).then((r) => {
    if (r.id !== null && r.id !== '') {
      res.send(r)
    } else {
      res.sendStatus(401)
    }
  })
    .catch(e => {
      res.status(500)
      res.send(e.message)
    })
})

app.post('/boot', async function (req: Request, res: Response) {
  boot(pool).then(() => {
    res.sendStatus(200)
  })
})

app.delete('/all', async function (req: Request, res: Response) {
  const client = await pool.connect()
  client.query(
    `DROP SCHEMA public CASCADE;
    CREATE SCHEMA public;`,
  ).then((r) => res.send(r))
})


// -------------------------- USER ----------------------------------------

app.post('/register', async function (req: Request, res: Response) {
  const user = getUserFromRequest(req.body)
  const userID: string = await insertUser(pool, user)
  res.send(JSON.stringify({ id: userID }))
})

app.post('/user', async function (req: Request, res: Response) {
  const user = getUserFromRequest(req.body)
  const userID: string = await insertUser(pool, user)
  res.send(JSON.stringify({ id: userID }))
})

app.put('/user', async function (req: Request, res: Response) {
  if (req.body.role !== undefined) {
    updateAdmin(pool, getAdminFromRequest(req.body)).then((r) => res.send(''))
  } else {
    updateClient(pool, getClientFromRequest(req.body)).then((r) => res.send(''))
  }
})

app.get('/user', async (req: Request, res: Response) => {
  const result = await execQuery('SELECT * FROM user_table')
  res.send(result)
})

app.delete('/user/:id', async (req: Request, res: Response) => {
  const id = req.params.id
  deleteUser(pool, id).then((result) => res.send(result))
})

app.get('/user/:userId', async function (req: Request, res: Response) {
  const userId = req.params.userId
  const result = await execQuery(`SELECT * FROM user_table WHERE id = ${userId}`)
  res.send(result)
})

// ----------------------------------------------------------------------------


// ----------------------------------- CLIENT --------------------------------


app.post('/client', async function (req: Request, res: Response) {
  if (!validateEmail(req.body.email)) {
    res.status(400)
    res.send('Bad email')
  } else {
    const user = getClientFromRequest(req.body)
    const clientID: string = await insertClient(pool, user)
    res.send(JSON.stringify({ id: clientID }))
  }
})

app.get('/client/:clientId', async function (req: Request, res: Response) {
  const clientId = req.params.clientId
  const client = await getClientByID(pool, clientId)
  res.send(client)
})

app.post('/client/login', async function (req: Request, res: Response) {
  const email = req.body.email
  const password = req.body.password
  loginClient(pool, email, password)
    .then((user) => {
      if (user) {
        const token = generateToken()
        res.status(200).json({
          user, token,
        })
      } else {
        res.sendStatus(401)
      }
    })
    .catch((e) => {
      res.status(500)
      res.send(e.message)
    })
})

// ----------------------------------------------------------------------------


// -------------------------- ADMIN -----------------------------


app.get('/admin/:adminId', async function (req: Request, res: Response) {
  const adminId = req.params.adminId
  const client = await getAdminByID(pool, adminId)
  res.send(client)
})

app.post('/admin/login', async function (req: Request, res: Response) {
  const email = req.body.email
  const password = req.body.password
  loginAdmin(pool, email, password)
    .then((user) => {
      if (user) {
        const token = generateToken()
        res.status(200).json({
          user, token,
        })
      } else {
        res.sendStatus(401)
      }
    })
    .catch((e) => {
      res.status(401)
      res.send(e.message)
    })
})

app.post('/admin', async function (req: Request, res: Response) {
  const admin = <Admin>getUserFromRequest(req.body)
  const userID: string = await insertAdmin(pool, admin)
  res.send(JSON.stringify({ id: userID }))
})

app.get('/is-admin/:userId', async function (req, res) {
  const adminId = req.params.userId
  try {
    const admin = await getAdminByUserId(pool, adminId)

    if (admin) {
      res.status(200)
      res.send('Is admin')
    } else {
      res.status(404)
      res.send('Not admin')
    }
  } catch (e) {
    res.status(500)
    res.send(e.message)
  }
})


// --------------------------------------------------------------


// -------------------------- CART ------------------------------

app.get('/cart/:clientId', async function (req: Request, res: Response) {
  const clientId = req.params.clientId
  getCartByClientId(pool, clientId).then((cart) => res.send(cart))
})


app.post('/cart', async function (req: Request, res: Response) {
  const cart = getCartFromRequest(req.body)
  insertCart(pool, cart).then((cartId) => res.send(JSON.stringify({ id: cartId })))
})

app.put('/cart/add-item', async function (req: Request, res: Response) {
  const cart = req.body.cartId
  const publication = req.body.publicationId
  addPublicationToCart(pool, cart, publication).then((r) => res.send(JSON.stringify({ id: r })))
})

app.put('/cart/remove-item', async function (req: Request, res: Response) {
  const cart = req.body.cartId
  const publication = req.body.publicationId
  const quantity = req.body.quantity
  removePublicationFromCart(pool, cart, publication, quantity).then((r) => res.send(JSON.stringify({ id: r })))
})


// --------------------------------------------------------------


// ----------------------- PRODUCT -------------------------------

app.get('/product', async function (req: Request, res: Response) {
  getAllProducts(pool).then((result) => res.send(result))
})

app.get('/product/:productId', async function (req: Request, res: Response) {
  const productId = req.params.productId
  getProductByID(pool, productId).then((result) => res.send(result))
})

// -----------------------------------------------------------------


// ----------------------- PUBLICATION -------------------------------

app.get('/publication', async function (req: Request, res: Response) {
  getAllPublications(pool).then((result) => res.send(result))
})

app.get('/publication/:publicationId', async function (req: Request, res: Response) {
  const publicationId = req.params.publicationId
  getPublicationByID(pool, publicationId).then((result) => {
    if (result)
      res.send(result)
    else res.status(404).send('Not found')
  })
})

app.post('/publication', async function (req: Request, res: Response) {
  const name = req.body.name
  const value = req.body.value
  const sellerId = req.body.sellerId
  const imagenes = req.body.images
  const productId = req.body.productId
  const description = req.body.description
  insertPublication2(pool, name, value, description, sellerId, productId, imagenes).then((result) => {
    res.status(200)
    res.send({ publicationId: result })
  })
})

app.put('/publication', async function (req: Request, res: Response) {
  const publication = getPublicationFromRequest(req.body)
  updatePublication(pool, publication).then((result) => {
    if (result != '') {
      return res.sendStatus(200)
    } else {
      res.status(400)
      res.send(result)
    }
  })
})


app.delete('/publication/:publicationId', async function (req: Request, res: Response) {
  const publicationId = req.params.publicationId
  deletePublication(pool, publicationId).then((result) => res.send(result))
})

// -------------------------------------------------------------------


// ----------------------- Q&A ---------------------------------------

app.get('/qa/:publicationId', async function (req: Request, res: Response) {
  const publicationId = req.params.publicationId
  const client = await getProductQuestionAnswer(pool, publicationId)
  res.send(client)
})

app.post('/question', async function (req: Request, res: Response) {
  const question = getQuestionFromRequest(req.body)
  insertQuestion(pool, question).then((id) => res.sendStatus(200))
})

app.post('/answer', async function (req: Request, res: Response) {
  const answer = getAnswerFromRequest(req.body)
  insertAnswer(pool, answer).then((id) => res.sendStatus(200))
})

// ----------------------------------------------------------------------


// ----------------------- Sale ---------------------------------------

app.get('/sale/:id', async function (req: Request, res: Response) {
  const id = req.params.id
  getSale(pool, id).then((sale) => res.send(sale))
})


app.post('/sale', async function (req: Request, res: Response) {
  const publication_id = req.body.publicationId
  const price = req.body.price
  const buyer_id = req.body.buyerId
  const direction = req.body.direction
  const traking_id = uuidv1()
  insertSale(pool, publication_id, buyer_id, price, traking_id, direction).then((id) => res.sendStatus(200))
})

// ----------------------------------------------------------------------


// ----------------------- REVIEW ---------------------------------------

// Sellers reviews made by buery ':id'
app.get('/buyer/seller/review/:id', async function (req: Request, res: Response) {
  const buyer = req.params.id
  getSellerReviewsForClient(pool, buyer).then((sale) => res.send(sale))
})

// Seller reviews
app.get('/seller/review/:id', async function (req: Request, res: Response) {
  const seller = req.params.id
  getSellerReviewsForSeller(pool, seller).then((sale) => res.send(sale))
})

app.post('/seller/review', async function (req: Request, res: Response) {
  const buyer_id = req.body.buyer_id
  const seller_id = req.body.seller_id
  const description = req.body.description
  const calification = req.body.calification
  insertSellerReview(pool, buyer_id, seller_id, description, calification).then((id) => res.sendStatus(200))
})


// Products reviews made by buery ':id'
app.get('/buyer/product/review/:id', async function (req: Request, res: Response) {
  const buyer = req.params.id
  getProductReviewsForClient(pool, buyer).then((sale) => res.send(sale))
})

// Products reviews
app.get('/product/review/:id', async function (req: Request, res: Response) {
  const seller = req.params.id
  getProductReviewsForProduct(pool, seller).then((sale) => res.send(sale))
})

app.post('/product/review', async function (req: Request, res: Response) {

  const buyer_id = req.body.buyer_id
  const product_id = req.body.product_id
  const description = req.body.description
  const calification = req.body.calification
  insertProductReview(pool, buyer_id, product_id, description, calification).then((id) => res.sendStatus(200))
})

// ----------------------------------------------------------------------


// ---------------------- Credit Card ------------------------------------

const https = require('https')

app.post('/card', async function (req: Request, res: Response) {
  const options = {
    hostname: 'bisa.herokuapp.com',
    port: 443,
    path: '/pay',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Length': req.body.card.length
    },
  }

  const request = https.request(options, (response) => {
    let body = ''
    response.on('data', (d) => body += d)
    response.on('end', () => {
      res.status(response.statusCode)
      res.send(body)
    })
  })

  request.write(JSON.stringify(req.body.card))
  request.end()
})

app.get('/card/key', async function (req: Request, res: Response) {
  https.get({ host: 'bisa.herokuapp.com', path: '/publicKey' }, (response) => {
    let body = ''
    response.on('data', (d) => body += d)
    response.on('end', () => res.send(body))
  })
})

// -----------------------------------------------------------------------
const port = process.env.PORT || 3001

app.listen(port, function () {
  console.log(`Server started on port: ${port}`)
})
