import React, { useState, useEffect, useContext, useRef } from "react";
import { Spring } from "react-spring/renderprops";
import { UserContext } from "../functions/UserProvider";
import { useHistory } from "react-router-dom";
import { firestore, storage } from "../functions/Firebase.js";
import "../styles/contenido.css";
import "../styles/text-input-style.css";
import "../styles/loader.css";

const NuevoProyecto = () => {
  const isMountedRef = useRef(null);
  const history = useHistory();

  const db = firestore;
  const [data, setData] = useState("");
  const [receivedData, setReceivedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  useEffect(() => {
    isMountedRef.current = true;
    if (user) {
      db.collection("projects")
        .doc(user.uid)
        .get()
        .then((doc) => {
          if (doc && isMountedRef.current) {
            setReceivedData(doc.data());
            console.log("ENTRO ACA");
          }
          setLoading(false);
        });
    }

    return () => (isMountedRef.current = false);
  }, [user, db]);

  const handleSendData = (e) => {
    e.preventDefault();
    const newProjectData = {
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
      newProjectData.title &&
      newProjectData.image &&
      newProjectData.link &&
      newProjectData.description
    ) {
      console.log("received: ", receivedData);
      var dataToSend = [];
      if (receivedData) dataToSend = receivedData.projects;
      dataToSend.push(newProjectData);
      db.collection("projects")
        .doc(`${user.uid}`)
        .set({
          projects: dataToSend,
        })
        .then(() => {
          //if (isMountedRef.current) {
          setData(newProjectData);
          console.log("new project data: ", newProjectData);
          //}
        })
        .then(() => {
          history.push("/mis_proyectos");
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
              <h1 className="titulo">NUEVO PROYECTO</h1>
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
                    placeholder="Escribe aquí el título de tu proyecto"
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
                    placeholder="Descripción del proyecto"
                    style={{ backgroundColor: "white" }}
                  />
                </div>
                <div className="text-center mt-3">
                  <button
                    className="btn btn-primary"
                    onClick={(e) => handleSendData(e)}
                  >
                    Agregar nuevo proyecto
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

export default NuevoProyecto;
