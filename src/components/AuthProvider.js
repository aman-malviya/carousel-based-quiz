import React, { useEffect, useState } from "react";
import firebaseApp from "../firebase";
export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged(function (user) {
      if (user) console.log("INNNNNNNNNNNNNN");
      else console.log("OUTTTTTTTTTTTTTTTT");
      console.log(isLogged);
      setIsLogged(true);
      console.log(isLogged);

      setPending(false);
    });
  }, []);

  if (pending) {
    return <>Loading...</>;
  }
  return (
    <AuthContext.Provider value={isLogged}>{children}</AuthContext.Provider>
  );
};

// import React, { useEffect, useState } from "react";
// import { auth } from "../firebase";

// export const AuthContext = React.createContext();

// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [pending, setPending] = useState(true);

//   useEffect(() => {
//     auth.onAuthStateChanged((user) => {
//       console.log(user);
//       setCurrentUser(user);
//       setPending(false);
//       console.log("checking the database ");
//     });
//   }, []);

//   if (pending) {
//     return <>Loading...</>;
//   }

//   return (
//     <AuthContext.Provider
//       value={{
//         currentUser,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };
