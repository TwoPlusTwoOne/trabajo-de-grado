// const baseUri = 'https://mitesis.herkouapp.com'
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

export const getProductById = (id: number) => {
  return fetch(`${baseUri}/product`, { method: 'get' })
    .then(response => response.json())
    .then(body => body.find((p: Product) => p.id === id))
}

export const login = (info: { email: string, password: string }) => {
  const clientUrl = `${baseUri}/client/login`
  const adminUrl = `${baseUri}/admin/login`

  const init: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(info),
  }

  return fetch(adminUrl, init).then(response => response.status === 401 ? fetch(clientUrl, init) : response)
}

export const getProducts = (): Promise<Product[]> => {
  const url = `${baseUri}/product`

  const init: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  }

  return fetch(url, init).then(response => response.json())
}

export const getPublications = (): Promise<Publication[]> => {
  const url = `${baseUri}/publication`

  const init: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  }

  return fetch(url, init).then(response => response.json())
}

export const getPublicationById = (publicationId: string): Promise<Publication> => {
  const url = `${baseUri}/publication/${publicationId}`

  const init: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  }

  return fetch(url, init).then(response => response.json())
}

export const updatePublication = (publication: Publication) => {
  const url = `${baseUri}/publication`

  const init: RequestInit = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(publication)
  }

  return fetch(url, init)
}

export const deletePublication = (publicationId: number) => {
  const url = `${baseUri}/publication/${publicationId}`

  const init: RequestInit = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }
  }

  return fetch(url, init)
}

export const getQuestionsForPublication = (productId: number): Promise<PublicationQnA[]> => {

  const url = `${baseUri}/qa/${productId}`

  const init: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  }

  return fetch(url, init).then(response => response.json())
}

export const postQuestion = (info: { question: string, userId: number, publicationId: number }) => {
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

export const postAnswer = (info: { answer: string, questionId: number, userId: number, publicationId: number }) => {
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

export const getCart = (clientId: number) => {
  const url = `${baseUri}/cart/${clientId}`

  const init: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  }

  return fetch(url, init)
}

export const addItemToCart = (info: { cartId: number, publicationId: number }) => {
  const url = `${baseUri}/cart/add-item`

  const init: RequestInit = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(info)
  }

  return fetch(url, init)
}


export const removeItemFromCart = (info: { cartId: number, publicationId: number }) => {
  const url = `${baseUri}/cart/remove-item`

  const init: RequestInit = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...info, quantity: 1 })
  }

  return fetch(url, init)
}

export const getCardKey = () => {
  const url = `${baseUri}/card/key`

  return fetch(url)
}


export const postCard = (info: { card: any }) => {
  const url = `${baseUri}/card`

  const init: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(info)
  }

  return fetch(url, init)
}
