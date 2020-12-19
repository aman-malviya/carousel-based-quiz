import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import App from './App'
import Landing from './Landing'
import Otp from './Otp'

export default function CreatedRoutes(){
    return(<div>
       <Router>
    <Switch>
    <Route path='/' exact><Landing /></Route>
    <Route path='/verification'><Otp /></Route>
    <Route path='/quiz'><App /></Route>
    </Switch>
    </Router>
    </div>)
}
