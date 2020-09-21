import React, { Component } from "react";

class Perfil extends Component {
  render() {
    return (
      <div>
        <h1>Este es el perfil de {this.props.nombre}</h1>
        <img src={this.props.photo} widht="200px" alt="profile_photo" style={{borderRadius: "50%"}}/> 
      </div>
    );
  }
}

export default Perfil;
