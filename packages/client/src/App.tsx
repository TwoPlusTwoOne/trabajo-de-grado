import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { LoginView } from './views/loginView'
import { Container } from './components/catalog/container/container'
import Topbar  from './components/topbar/tobar'
 
const App = () => (
  <Router>
    <div>
      <Route path="/" exact component={Topbar} />
    </div>
  </Router>
)

export default App;
