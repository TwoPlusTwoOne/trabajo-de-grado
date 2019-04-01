import React from 'react'
import './App.css'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { SecuredRoute } from './components/secured-route/securedRoute'
import { Home } from './components/home/home'
import { LoginView } from './views/login-view/loginView'
import { UnsecuredRoute } from './components/unsecured-route/unsecuredRoute'

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <SecuredRoute exact path="/" component={Home} />
          <UnsecuredRoute path="/login" exact component={LoginView} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
