export type User = {
  birthdate: string
  direction: string
  dni: string
  email: string
  first_name: string
  id: number
  last_name: string
  password: string
}

const logIn = (user: User) => sessionStorage.setItem('user', JSON.stringify(user))

const logOut = () => sessionStorage.clear()

const getLoggedUser = () => {
  const item = sessionStorage.getItem('user')
  if (item) return JSON.parse(item)
  else throw Error('No user logged in.')
}

const isLoggedIn = () => !!sessionStorage.getItem('user')

export { logIn, logOut, getLoggedUser, isLoggedIn }