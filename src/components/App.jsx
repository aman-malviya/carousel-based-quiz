import React, { useEffect } from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Quiz from './Quiz'
import Landing from './Landing'
import Otp from './Otp'
import {auth} from '../firebase';
import Admin from './Admin'
import Instructions from './Instructions'
import AdminAuth from './AdminAuth'

export default function App(){
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
    <Route path='/quiz'><Quiz /></Route>
    <Route path='/admin-login'><AdminAuth /></Route>
    <Route path='/admin'><Admin /></Route>
    <Route path='/instructions'><Instructions /></Route>
    </Switch>
    </Router>
    </div>)
}
