import React from 'react'
import {useState} from 'react'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import Quiz from './Quiz'
import Landing from './Landing'
import Otp from './Otp'
// import {auth} from '../firebase';
import Admin from './Admin'
import Instructions from './Instructions'
import AdminAuth from './AdminAuth'
import Score from './Score'

export default function App(){

    // const [msg, setMsg]=useState();
    // window.addEventListener("popstate", e=>{
    //     window.history.go(1);
    //     setMsg(<p style={{'color':'#f1faee', 'textAlign':'center'}}>You can't go to previous page</p>)
    //     setTimeout(() => {
    //         setMsg("");
    //     }, 2000);
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
    <Route path='/score'><Score /></Route>
    </Switch>
    </Router>
    </div>)
}
