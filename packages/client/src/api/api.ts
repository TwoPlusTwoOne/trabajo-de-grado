import { ProductType } from '../components/product/product'

const baseUri = 'http://localhost:3001'

export const getAllUsers = () => {
  return fetch(`${baseUri}/user`, { method: 'get' })
}

export const getUserById = (id: string) => {
  return fetch(`${baseUri}/user/${id}`, { method: 'get' })
}

export const getAllXss = () => {
  return fetch(`${baseUri}/xss`, { method: 'get' })
}

export const getAllProducts = () => {
  return fetch(`${baseUri}/product`, { method: 'get' })
}

export const getProductById = (id: number) => {
  return fetch(`${baseUri}/product`, { method: 'get' })
    .then(response => response.json())
    .then(body => body.find((p: ProductType) => p.id === id))
}

export const login = (info: { email: string, password: string }) => {
  const url = `${baseUri}/login`

  const init: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(info),
  }

  return fetch(url, init)
}

export const getProducts = () => {
  const url = `${baseUri}/product`

  const init: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  }

  return fetch(url, init)
}

export const getQuestionsForProduct = (productId: string) => {

  const url = `${baseUri}/qa/${productId}`

  const init: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  }

  return fetch(url, init)
}

export const postQuestion = (info: { question: string, userId: string, productId: string }) => {
  const url = `${baseUri}/question`
  const init: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(info),
  }

  return fetch(url, init)
}
