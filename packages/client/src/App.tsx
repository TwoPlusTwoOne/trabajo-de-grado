import React from 'react'
import './App.css'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { SecuredRoute } from './components/secured-route/securedRoute'
import { Home } from './components/home/home'
import { LoginView } from './views/login-view/loginView'
import { UnsecuredRoute } from './components/unsecured-route/unsecuredRoute'
import { SuperComponent } from './components/superComponent/superComponent'
import { ProductView } from './views/product-view/productView'
import { Base } from './components/base/base'

const App = () => {
  return (
    <Router>
      <Base>
        <Switch>
          <UnsecuredRoute exact path="/login" component={LoginView} />
          <SecuredRoute exact path="/" component={Home} />
          <SecuredRoute exact path="/products/:productId" component={ProductView} />
        </Switch>
      </Base>
    </Router>
  )
}

export default App
