import React, { useContext } from "react";
import Firebase from "./components/functions/Firebase.js";
import { AuthContext } from "./components/functions/Auth.js";

const ComponentTester = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <>
      <button onClick={() => Firebase.auth().signOut()}>Sign Out</button>
      <h1> Hola {currentUser}</h1>
    </>
  );
};

export default ComponentTester;
