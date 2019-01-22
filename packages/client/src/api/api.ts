const baseUri = 'http://localhost:3001'

export const getAllUsers = () => {
  return fetch(`${baseUri}/user`, { method: 'get' })
}

export const getUserById = (id: string) => {
  console.log('getUserById', id)
  return fetch(`${baseUri}/user/${id}`, { method: 'get' })
}

export const getAllXss = () => {
  return fetch(`${baseUri}/xss`, { method: 'get' })
}

export const login = (info: { email: string, password: string }) => {
  const url = `${baseUri}/login`

  const init = {
    method: 'post',
    body: JSON.stringify(info),
  }

  return fetch(url, init)
}