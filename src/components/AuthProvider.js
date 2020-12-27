// import React, { useEffect, useState } from "react";
// import {auth} from "../firebase";

// export const AuthContext = React.createContext();

// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [pending, setPending] = useState(true);

//   useEffect(() => {
//     auth.onAuthStateChanged((user) => {
//       setCurrentUser(user)
//       setPending(false)
//       console.log("checking the database ")
//     });
//   }, []);

//   if(pending){
//     return <>Loading...</>
//   }

//   return (
//     <AuthContext.Provider
//       value={{
//         currentUser
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };
import React, {createContext,useState, useEffect} from 'react';
import {auth} from '../firebase';
export const AuthContext= createContext({userPresent:false,user:null})
export default function FirebaseAuthContext(props){
    
   
    let [state,changeState] = useState({
        userDataPresent:false,
        
        user:null,
        listener:null
    })

    useEffect(()=>{
        
        if(state.listener==null){
        
       
        changeState({...state,listener:auth.onAuthStateChanged((user)=>{
            
           if(user)
                { console.log("yessss")
                   changeState(oldState=>({...oldState,userDataPresent:true,user:user}));
                }
            else
            {           
                console.log("noooo")
                 changeState(oldState=>({...oldState,userDataPresent:true,user:null}));
            }
        })});
        
    }
    return ()=>{
      if(state.listener)
      console.log("state listener")
        state.listener()
    }
    
    },[])
  
  
  
    return (
        <AuthContext.Provider value={state}>
            {props.children}
        </AuthContext.Provider>
    )
}