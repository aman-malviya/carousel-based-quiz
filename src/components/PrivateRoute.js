  
// import React, { useContext } from "react";
// import { Route, Redirect } from "react-router-dom";
// import { AuthContext } from "./AuthProvider";

// const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
//   const {currentUser} = useContext(AuthContext);
//   return (
//     <Route
//       {...rest}
//       render={routeProps =>
//         !!currentUser ? (
//           <RouteComponent {...routeProps} />
//         ) : (
//           <Redirect to='/admin-login' />
//         )
//       }
//     />
//   );
// };


// export default PrivateRoute


import React, { useContext } from 'react';
import {AuthContext}from './AuthProvider';
import {Route,Redirect} from 'react-router-dom';

export default function ProtectedRoute(props){
   
    const authValue=useContext(AuthContext)
    if (authValue.userDataPresent){
        if(authValue.user==null){
            console.log("null value")
            return(<Redirect to={props.redirectTo}></Redirect>)
        }
        else{
            console("ohhhhhhh")
            return(
            
            <Route exact path={props.path}>
                {props.children}

            </Route>)
        }
    }
    else{
        
        return null
    }
}