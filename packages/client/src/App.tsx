import React from 'react'
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { SecuredRoute } from './components/secured-route/securedRoute'
import { Home } from './components/home/home'
import { LoginView } from './views/loginView'
import { UnsecuredRoute } from './components/unsecured-route/unsecuredRoute'

const App = () => (
  <Router>
    <div>
      <SecuredRoute path="/" exact component={Home} />
      <UnsecuredRoute path="/login" exact component={LoginView}/>
    </div>
  </Router>
)

export default App
