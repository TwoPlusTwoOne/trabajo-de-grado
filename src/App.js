import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { LoginView } from './views/loginView'

const App = () => (
  <Router>
    <div>
      <Route path="/" exact component={LoginView} />
    </div>
  </Router>
)

export default App;
