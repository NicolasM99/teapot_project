import React, { useState, useEffect, useContext, useRef } from "react";
import { Spring } from "react-spring/renderprops";
import { UserContext } from "../functions/UserProvider";
import { useHistory } from "react-router-dom";
import { firestore, storage } from "../functions/Firebase.js";
import "../styles/contenido.css";
import "../styles/text-input-style.css";
import "../styles/loader.css";

const NuevaCategoria = () => {
  const isMountedRef = useRef(null);
  const history = useHistory();

  const db = firestore;
  const [data, setData] = useState("");
  const [receiverdData, setReceivedData] = useState("");
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  useEffect(() => {
    isMountedRef.current = true;
    if (user) {
      db.collection("categories")
        .get()
        .then((querySnapshot) => {
          if (querySnapshot && isMountedRef.current) {
            setReceivedData(querySnapshot.docs.map((doc) => doc.data()));
            setLoading(false);
          }
        });
    }

    return () => (isMountedRef.current = false);
  }, [user, db]);

  const handleSendData = (e) => {
    e.preventDefault();
    const newCategoryData = {
      title: document.getElementById("titleInput").value,
      image: document.getElementById("imageInput").value,
      description: document.getElementById("descriptionInput").value,
      link: `categoria_${document
        .getElementById("titleInput")
        .value.toLowerCase()
        .replace(/ /g, "_")}`,
    };
    if (
      user &&
      newCategoryData.title &&
      newCategoryData.image &&
      newCategoryData.link &&
      newCategoryData.description
    ) {
      db.collection("categories")
        .doc(`${receiverdData.length + 1}`)
        .set(newCategoryData)
        .then(() => {
          //if (isMountedRef.current) {
          setData(newCategoryData);
          console.log("new category data: ", newCategoryData);
          //}
        })
        .then(() => {
          history.push("/categorias");
          window.location.reload();
        });
      //console.log(user.displayName);
    } else {
      if (data) {
        //setData(null);
      }
    }
  };
  if (loading) {
    return (
      <>
        <div className="contenido">
          <h1 className="text-center">Cargando, por favor espera...</h1>
          <div className="loader" />
        </div>
      </>
    );
  } else {
    return (
      <Spring
        from={{ opacity: 0, marginTop: -40 }}
        to={{ opacity: 1, marginTop: 0 }}
      >
        {(props) => (
          <div style={props}>
            <div className="contenido">
              <h1 className="titulo">NUEVA CATEGORIA</h1>
              <form>
                <div className="row">
                  <label
                    className="col-sm-12 col-md-12 col-lg-1 input_label"
                    htmlFor="titleInput"
                  >
                    Título:
                  </label>
                  <input
                    autoComplete="off"
                    type="text"
                    name="titleInput"
                    id="titleInput"
                    className="form-control col-md-8 mx-auto"
                    placeholder="Escribe aquí el título de la categoría"
                    style={{ backgroundColor: "white" }}
                  />
                </div>
                <div className="row">
                  <label
                    className="col-sm-12 col-md-12 col-lg-1 input_label"
                    htmlFor="imageInput"
                  >
                    Imagen:
                  </label>
                  <input
                    autoComplete="off"
                    type="text"
                    name="imageInput"
                    id="imageInput"
                    className="form-control col-md-8 mx-auto"
                    placeholder="URL de la imagen"
                    style={{ backgroundColor: "white" }}
                  />
                </div>
                <div className="row">
                  <label
                    className="col-sm-12 col-md-12 col-lg-1 input_label"
                    htmlFor="descriptionInput"
                  >
                    Descripción:
                  </label>
                  <textarea
                    autoComplete="off"
                    type="text"
                    name="descriptionInput"
                    id="descriptionInput"
                    className="form-control p-2 col-md-8 mx-auto"
                    placeholder="Descripción de la categoría"
                    style={{ backgroundColor: "white" }}
                  />
                </div>
                <div className="text-center mt-3">
                  <button
                    className="btn btn-primary"
                    onClick={(e) => handleSendData(e)}
                  >
                    Agregar nueva categoría
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </Spring>
    );
  }
};

export default NuevaCategoria;
