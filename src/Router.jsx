import React, { useEffect } from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import App from './App'
import Landing from './Landing'
import Otp from './Otp'
import {auth} from './firebase';

export default function CreatedRoutes(){
    // useEffect(()=>{
    //     auth.onAuthStateChanged((authUser))=>{
    //         if(authUser)
    //         {
    //             //user is logged in
    //         }
    //         else {
    //             //user is logged out
    //         }
    //     }
    // })
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
