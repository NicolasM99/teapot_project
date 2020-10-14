import React from "react";
import { Spring } from "react-spring/renderprops";
import "../styles/contenido.css";

const CategoriaIndividual = ({ titulo, descripcion, proyectos }) => {
  return (
    <Spring
      from={{ opacity: 0, marginTop: -40 }}
      to={{ opacity: 1, marginTop: 0 }}
    >
      {(props) => (
        <div style={props}>
          <div className="wrapper">
            <div className="contenido">
              <h1 className="titulo">{titulo}</h1>
              <div className="contenedor_parrafo mx-auto">
                <p className="parrafo">{descripcion}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Spring>
  );
};

export default CategoriaIndividual;
