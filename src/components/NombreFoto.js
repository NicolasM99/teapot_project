import React, { Component } from "react";

class NombreFoto extends Component {
  render() {
    const { nombre, photo } = this.props;
    return (
      <div className="text-center my-0" style={{ width: "50%" }}>
        <img
          src={photo}
          alt={"profile_photo"}
          width="30px"
          style={{
            borderRadius: "50%",
            marginRight: "5px",
            marginLeft: "5px",
          }}
        />
        <span style={{ fontSize: "1em" }}>
          {nombre.substr(0, nombre.indexOf(" "))}
        </span>
      </div>
    );
  }
}

export default NombreFoto;
