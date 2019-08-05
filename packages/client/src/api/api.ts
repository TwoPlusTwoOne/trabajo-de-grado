// const baseUri = 'https://mitesis.herokuapp.com'
import { getToken, UserBase } from '../helpers/auth'

const baseUri = 'http://localhost:3001'

export const getAllUsers = (): Promise<GetUsersResponse> => {
  const token = getToken()

  const init: RequestInit = {
    method: 'get',
    headers: {
      Authorization: token,
    },
  }

  return fetch(`${baseUri}/user`, init)
    .then(response => response.json())
}

export const createUser = (user: UserBase) => {
  const token = getToken()
  const url = `${baseUri}/register`

  const init: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },

    body: JSON.stringify({ ...user, dateLocale: 'en', dateFormat: 'YYYY-MM-DD' }),
  }

  return fetch(url, init)
}

export const deleteUser = (userId: number) => {
  const token = getToken()
  const url = `${baseUri}/user/${userId}`

  const init: RequestInit = {
    method: 'DELETE',
    headers: {
      Authorization: token,
    },
  }

  return fetch(url, init)
}

export const login = (info: { email: string, password: string }): Promise<LoginResponse> => {
  const clientUrl = `${baseUri}/client/login`
  const adminUrl = `${baseUri}/admin/login`

  const init: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(info),
  }

  return fetch(adminUrl, init)
    .then(response => response.status === 401 ? fetch(clientUrl, init) : response)
    .then(response => {
      if (response.status < 400)
        return response.json()

      return response.text()
    })
}

export const registerUser = (info: {
  first_name: string,
  last_name: string,
  direction: string,
  dni: string,
  password: string,
  email: string,
  birthdate: Date,
}) => {
  const url = `${baseUri}/client`

  const init: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(info),
  }

  return fetch(url, init)
}

export const getProducts = (): Promise<Product[]> => {
  const token = getToken()
  const url = `${baseUri}/product`

  const init: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },

  }

  return fetch(url, init).then(response => response.json())
}

export const getPublications = (): Promise<Publication[]> => {
  const token = getToken()
  const url = `${baseUri}/publication`

  const init: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },

  }

  return fetch(url, init).then(response => response.json())
}

export const getPublicationById = (publicationId: string): Promise<Publication> => {
  const token = getToken()
  const url = `${baseUri}/publication/${publicationId}`

  const init: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },

  }

  return fetch(url, init).then(response => response.json())
}

export const updatePublication = (publication: Publication) => {
  const token = getToken()
  const url = `${baseUri}/publication`

  const init: RequestInit = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(publication),

  }

  return fetch(url, init)
}

export const deletePublication = (publicationId: number) => {
  const token = getToken()
  const url = `${baseUri}/publication/${publicationId}`

  const init: RequestInit = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },

  }

  return fetch(url, init)
}

export const createPublication = (info: { name: string, value: string, sellerId: number, images: string[], productId: number, description: string }) => {
  const token = getToken()
  const url = `${baseUri}/publication`

  const init: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(info),

  }

  return fetch(url, init)
}

export const getQuestionsForPublication = (productId: number): Promise<PublicationQnA[]> => {
  const token = getToken()
  const url = `${baseUri}/qa/${productId}`

  const init: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },

  }

  return fetch(url, init).then(response => response.json())
}

export const postQuestion = (info: { question: string, userId: number, publicationId: number }) => {
  const token = getToken()
  const url = `${baseUri}/question`
  const init: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(info),

  }

  return fetch(url, init)
}

export const postAnswer = (info: { answer: string, questionId: number, userId: number }) => {
  const token = getToken()
  const url = `${baseUri}/answer`
  const init: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(info),

  }

  return fetch(url, init)
}

export const getCart = (clientId: number) => {
  const token = getToken()
  const url = `${baseUri}/cart/${clientId}`

  const init: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },

  }

  return fetch(url, init)
}

export const addItemToCart = (info: { cartId: number, publicationId: number }) => {
  const token = getToken()
  const url = `${baseUri}/cart/add-item`

  const init: RequestInit = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(info),

  }

  return fetch(url, init)
}

export const removeItemFromCart = (info: { cartId: number, publicationId: number }) => {
  const token = getToken()
  const url = `${baseUri}/cart/remove-item`

  const init: RequestInit = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({ ...info, quantity: 1 }),

  }

  return fetch(url, init)
}

export const postCard = (info: { card: any }) => {
  const token = getToken()
  const url = `${baseUri}/card`

  const init: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(info),

  }

  return fetch(url, init)
}

export const createSale = (info: { publicationId: number, price: string, buyerId: number }) => {
  const token = getToken()
  const url = `${baseUri}/sale`

  const init: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(info),

  }

  return fetch(url, init)
}
