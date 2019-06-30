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
  return fetch('/product', { method: 'get' })
}

export const getProductById = (id: string) => {
  return fetch(`/product/${id}`, { method: 'get' })
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