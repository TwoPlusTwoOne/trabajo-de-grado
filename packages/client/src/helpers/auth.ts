export type Client = UserBase & {
  client_id: number
}

export type Admin = UserBase & {
  role_name: string
  admin_id: number
}

export type UserBase = {
  birthdate: string
  direction: string
  dni: string
  email: string
  first_name: string
  id: number
  last_name: string
  password: string
  userID: number
}

export type User = Client | Admin

export type AuthState = {
  logIn: (user: User, token: string) => void
  logOut: () => void
}

const logIn = (user: User, token: string) => {
  sessionStorage.setItem('user', JSON.stringify(user))
  sessionStorage.setItem('token', token)
}

const logOut = () => sessionStorage.clear()

const getLoggedUser = (): User => {
  const item = sessionStorage.getItem('user')
  if (item) return JSON.parse(item)
  else throw Error('No user logged in.')
}

const isLoggedIn = () => !!sessionStorage.getItem('user')

const isAdmin = () => (getLoggedUser() as Admin).role_name === 'admin'

const getToken = () => sessionStorage.getItem('token') || ''

export { logIn, logOut, getLoggedUser, isLoggedIn, isAdmin, getToken }
