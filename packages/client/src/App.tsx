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
import { MyPublicationsView } from './views/my-publications-view/myPublicationsView'
import { EditPublicationView } from './views/edit-publication-view/editPublicationView'
import { CreatePublicationView } from './views/create-publication-view/createPublicationView'
import { CartView } from './views/cart-view/cartView'
import { CheckoutView } from './views/checkout-view/checkoutView'
import { PublicationQuestionsView } from './views/publication-questions-view/publicationQuestionsView'
import { RegisterView } from './views/register-view/registerView'
import { AdminRoute } from './components/admin-route/adminRoute'
import { AdminPanel } from './views/admin-panel/adminPanel'
import { CreateUserView } from './views/create-user-view/createUserView'

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
        <Router>
          <Base loggedUser={this.state.auth.loggedUser}>
            <Switch>
              <UnsecuredRoute exact path="/login" component={LoginView} />
              <UnsecuredRoute exact path="/register" component={RegisterView} />
              <SecuredRoute exact path="/" component={Home} />
              <SecuredRoute exact path="/my-publications" component={MyPublicationsView} />
              <SecuredRoute exact path="/my-publications/create" component={CreatePublicationView} />
              <SecuredRoute exact path="/my-publications/:publicationId/edit" component={EditPublicationView} />
              <SecuredRoute exact path="/my-publications/:publicationId/questions" component={PublicationQuestionsView} />
              <SecuredRoute exact path="/publications/:productId" component={ProductView} />
              <SecuredRoute exact path="/cart" component={CartView} />
              <SecuredRoute exact path="/checkout" component={CheckoutView} />
              <AdminRoute exact path="/admin" component={AdminPanel} />
              <AdminRoute exact path="/admin/create-user" component={CreateUserView} />
            </Switch>
          </Base>
        </Router>
      </AuthContext.Provider>
    )
  }
}

export default App
