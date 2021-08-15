import React from 'react'
import Info from './Info'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Quiz from './Quiz'
import Landing from './Landing'
import Admin from './Admin'
import Instructions from './Instructions'
import AdminAuth from './AdminAuth'
import NotFound from './NotFound'
import Score from './Score'
import Registration from './Registration'

export default function App(){
    
    return(
    <div>
            <Router>
                <Switch>
                    <Route path='/' exact><Landing /></Route>
                    <Route path='/register' exact><Registration /></Route>
                    <Route path='/admin-login'><AdminAuth /></Route>
                    <Route path='/admin'><Admin /></Route>
                    <Route path="/all-registered" ><Info /></Route>
                    <Route path='/quiz' component={Quiz} />
                    <Route path='/instructions' component={Instructions} />
                    <Route path='/score' component={Score} />
                    <Route><NotFound /></Route>
                    </Switch>
                </Router>
    </div>
    )
}
