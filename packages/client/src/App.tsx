import React, { PureComponent } from 'react'
import './App.css'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { SecuredRoute } from './components/secured-route/securedRoute'
import { Home } from './components/home/home'
import { LoginView } from './views/login-view/loginView'
import { UnsecuredRoute } from './components/unsecured-route/unsecuredRoute'
import { ProductView } from './views/product-view/productView'
import { Base } from './components/base/base'
import { AuthState, getLoggedUser, isLoggedIn, logIn, logOut, User } from './helpers/auth'

export const AuthContext = React.createContext<AuthState>({
  logOut: () => null,
  logIn: () => null
})

export type State = {
  auth: { loggedUser: User | null }
}

class App extends PureComponent<{}, State> {
  constructor(props: {}) {
    super(props)

    this.state = {
      auth: {
        loggedUser: null
      }
    }
  }

  componentDidMount(): void {
    if (isLoggedIn())
      this.setState({ auth: { loggedUser: getLoggedUser() } })
  }

  logIn = (user: User) => {
    this.setState({ auth: { loggedUser: user } })
    logIn(user)
  }

  logOut = () => {
    this.setState({ auth: { loggedUser: null } })
    logOut()
  }


  render() {
    const authContext = {
      loggedUser: this.state.auth.loggedUser,
      logIn: this.logIn,
      logOut: this.logOut
    }

    return (
      <AuthContext.Provider value={authContext}>
        <Base loggedUser={this.state.auth.loggedUser}>
          <Router>
            <Switch>
              <UnsecuredRoute exact path="/login" component={LoginView} />
              <SecuredRoute exact path="/" component={Home} />
              <SecuredRoute exact path="/products/:productId" component={ProductView} />
            </Switch>
          </Router>
        </Base>
      </AuthContext.Provider>
    )
  }
}

export default App
