import React from 'react'
// import {useEffect} from 'react'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import Quiz from './Quiz'
import Landing from './Landing'
import Otp from './Otp'
// import {auth} from '../firebase';
import Admin from './Admin'
import Instructions from './Instructions'
import AdminAuth from './AdminAuth'
import Score from './Score'

// import { AuthProvider } from "./AuthProvider";
import PrivateRoute from "./PrivateRoute";
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

         <PrivateRoute redirectTo='/admin-login'  path='/admin'></PrivateRoute>

    <Route path='/instructions'><Instructions /></Route>
    <Route path='/score'><Score /></Route>
    </Switch>
    </Router>
    </div>)
}
