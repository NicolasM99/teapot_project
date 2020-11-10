import React from "react";
import { Link } from "react-router-dom";
import { Spring } from "react-spring/renderprops";
import "../styles/contenido.css";

const CategoriaIndividual = ({ categoryInfo }) => {
  return (
    <Spring
      from={{ opacity: 0, marginTop: -40 }}
      to={{ opacity: 1, marginTop: 0 }}
    >
      {(props) => (
        <div style={props}>
          <div className="wrapper">
            <div className="contenido">
              <div className="text-right">
                <Link to="/categorias">
                  <button className="btn btn-primary">
                    <b>Volver a las categorías</b>
                  </button>
                </Link>
              </div>
              {categoryInfo ? (
                <>
                  <h1 className="titulo">{categoryInfo.title}</h1>
                  <div className="contenedor_parrafo mx-auto">
                    <div className="row">
                      <p className="parrafo col-6">
                        {categoryInfo.description}
                      </p>
                      <img
                        className="col-6"
                        src={categoryInfo.image}
                        alt="category_image"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <h2>
                  Parece que no has seleccionado una categoría. Por favor,
                  vuelve a la lista de categorías y selecciona una.
                </h2>
              )}
            </div>
          </div>
        </div>
      )}
    </Spring>
  );
};

export default CategoriaIndividual;
