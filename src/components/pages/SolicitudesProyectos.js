import React, { useState, useEffect, useContext, useRef } from "react";
import { Table } from "react-bootstrap";
import { firestore } from "../functions/Firebase.js";
import { Spring } from "react-spring/renderprops";
import { UserContext } from "../functions/UserProvider";
import "../styles/loader.css";
import "../styles/contenido.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const SolicitudesProyectos = () => {
  const isMountedRef = useRef(null);
  const [data, setData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [projectsData, setProjectsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  const db = firestore;
  useEffect(() => {
    isMountedRef.current = true;
    if (db) {
      db.collection("categories")
        .get()
        .then((querySnapshot) => {
          if (querySnapshot && isMountedRef.current) {
            setData(querySnapshot.docs.map((doc) => doc.data()));
            setLoading(false);
          }
        });
    }
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .get()
        .then((doc) => {
          if (doc && isMountedRef.current) {
            setUserData(doc.data());
            setLoading(false);
          }
        });
      // //console.log(user.displayName);
    }
    if (user) {
      db.collection("project_requests")
        .get()
        .then((querySnapshot) => {
          if (querySnapshot && isMountedRef.current) {
            // console.log(querySnapshot.docs.map((doc) => doc.data()));
            setProjectsData(querySnapshot.docs.map((doc) => doc.data()));
            setLoading(false);
          }
        });
      // //console.log(user.displayName);
    } else {
      if (data) {
        //setData(null);
      }
    }

    return () => (isMountedRef.current = false);
  }, [user, db]);
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
            <h1 className="titulo">SOLICITUDES DE PROYECTOS</h1>
            <Table responsive="lg" striped bordered hover variant="dark">
              <thead>
                <tr className="text-center">
                  <th>N°</th>
                  <th>TÍTULO</th>
                  <th>DESCRIPCIÓN</th>
                  <th>AUTOR</th>
                  <th>ACCIONES</th>
                </tr>
              </thead>
              <tbody>
                {projectsData &&
                  projectsData.map((id, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{id.title}</td>
                      <td>{id.description}</td>
                      <td>{id.author}</td>
                      <td>
                        <button className="btn btn-success w-100">
                          <FontAwesomeIcon icon={faEye} /> Ver proyecto
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        )}
      </Spring>
    );
  }
};

export default SolicitudesProyectos;
