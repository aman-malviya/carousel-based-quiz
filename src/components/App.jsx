import React, {useState, useEffect} from 'react'
import LeaderBoard from './LeaderBoard'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Quiz from './Quiz'
import Landing from './Landing'
import Admin from './Admin'
import Instructions from './Instructions'
import AdminAuth from './AdminAuth'
import NotFound from './NotFound'
import Score from './Score'
import PrivateRoute from './PrivateRoute'
import {db} from '../firebase'

export default function App(){
    const [auth, setAuth]=useState(true);
    // useEffect(()=>{
    //    setAuth(sessionStorage.getItem("auth"));
    // })
    
    return(
    <div>
            <Router>
                <Switch>
                    <Route path='/' exact><Landing /></Route>
                    {/*<Route path='/verification'><Otp /></Route> */}
                    <Route exact path='/admin-login'><AdminAuth /></Route>
                    <Route exact path='/admin'><Admin /></Route>
                    <Route exact path="/leader-board" ><LeaderBoard /></Route>
                    <PrivateRoute exact auth={auth}  path='/quiz' component={Quiz} />
                    <PrivateRoute exact auth={auth}  path='/instructions' component={Instructions} />
                    <PrivateRoute exact auth={auth}  path='/score' component={Score} />
                    <Route><NotFound /></Route>
                    </Switch>
                </Router>
    </div>
    )
}
