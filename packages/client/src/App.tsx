import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { LoginView } from './views/loginView'
import { SuperComponent } from './components/superComponent/superComponent'



const App = () => (
  
    <Router>
      <div>
        <Route path="/" exact component= {SuperComponent} />
      </div>
    </Router>
  )



export default App;
