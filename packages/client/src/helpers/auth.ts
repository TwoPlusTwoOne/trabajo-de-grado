export type Client = UserBase

export type Admin = UserBase & {}

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
  logIn: (user: User) => void
  logOut: () => void
}

const logIn = (user: User) => sessionStorage.setItem('user', JSON.stringify(user))

const logOut = () => sessionStorage.clear()

const getLoggedUser = (): User => {
  const item = sessionStorage.getItem('user')
  if (item) return JSON.parse(item)
  else throw Error('No user logged in.')
}

const isLoggedIn = () => !!sessionStorage.getItem('user')

export { logIn, logOut, getLoggedUser, isLoggedIn }
