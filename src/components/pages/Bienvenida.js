import React, { Component } from "react";
import { Spring } from "react-spring/renderprops";
import "../styles/contenido.css";

class Bienvenida extends Component {
  render() {
    return (
      <Spring
        from={{ opacity: 0, marginTop: -40 }}
        to={{ opacity: 1, marginTop: 0 }}
      >
        {(props) => (
          <div style={props}>
            <div className="wrapper">
              <div className="contenido">
                <h1 className="titulo">BIENVENIDO</h1>
                <div className="contenedor_parrafo mx-auto col-lg-6">
                  <p className="parrafo">
                    <b>Multifolio</b> es un espacio donde verás proyectos
                    realizados por estudiantes de{" "}
                    <b>Ingeniería en Multimedia</b>
                  </p>
                  <p className="parrafo">
                    Estos proyectos están organizados por <b>categorías</b> para
                    que encuentres con mayor facilidad los de tu interés.
                  </p>
                  <p className="parrafo">
                    ¿Eres <b>estudiante o egresado</b> de esta carrera y quieres
                    publicar tus proyectos?
                    <br />
                    <br />
                    ¡Inicia sesión y crea tu perfil <b>ahora</b>!
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </Spring>
    );
  }
}

export default Bienvenida;
