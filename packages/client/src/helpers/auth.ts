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

class Auth {
  private loggedUser: User | null = null

  logIn = (user: User) => this.loggedUser = user

  logOut = () => this.loggedUser = null

  getLoggedUser = () => this.loggedUser

  isLoggedIn = () => !!this.loggedUser
}

const auth = new Auth()

export { auth }