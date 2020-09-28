import React, { Component } from "react";

class NombreFoto extends Component {
  render() {
    const { name, photo } = this.props;
    return (
      <div className="text-center my-0" style={{ width: "50%" }}>
        <img
          src={photo}
          alt={"profile_photo"}
          width="30px"
          height="30px"
          style={{
            objectFit: "cover",
            borderRadius: "50%",
            marginRight: "5px",
            marginLeft: "5px",
          }}
        />
        <span style={{ fontSize: "1em", textTransform: "none" }}>
          {name.substr(0, name.indexOf(" ")) === ""
            ? name
            : name.substr(0, name.indexOf(" "))}
        </span>
      </div>
    );
  }
}

export default NombreFoto;
