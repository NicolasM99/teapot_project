import React, { Component, useState } from "react";
import "../styles/contenido.css";

export default class Perfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
    };
  }
  render() {
    const { user, db } = this.props;

    const docRef = db.collection("users").doc(user.uid);
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          this.setState({ data: doc.data() });
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
    const userData = this.state.data;
    return (
      <div className="wrapper">
        <div className="contenido">
          <h1>PERFIL</h1>
          <p>Nombre de usuario: {userData.nickName} </p>
          <p>Email: {userData.email} </p>
          <img
            src={userData.profilePic}
            alt="profilePic"
            style={{
              width: "200px",
              height: "200px",
              objectFit: "cover",
              borderRadius: "50%",
              margin: "auto",
              marginBottom: "10px",
            }}
          />
          <p>Teléfono: {userData.tel}</p>
          {userData.estudiante ? (
            <>
              <p>Estudiante actualmente en {userData.semestre} semestre</p>
            </>
          ) : (
            <>
              <p>Egresado</p>
            </>
          )}
          <p>Experiencia laboral: {userData.exp}</p>
        </div>
      </div>
    );
  }
}
