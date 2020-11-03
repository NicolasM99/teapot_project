import React, { useState, useEffect, useContext, useRef } from "react";
import { Table } from "react-bootstrap";
import { firestore } from "../functions/Firebase.js";
import { Spring } from "react-spring/renderprops";
import { UserContext } from "../functions/UserProvider";
import "../styles/loader.css";
import "../styles/contenido.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPencilAlt,
  faUserPlus,
  faUserSlash,
} from "@fortawesome/free-solid-svg-icons";

const Usuarios = () => {
  const isMountedRef = useRef(null);
  const [data, setData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [usersData, setUsersData] = useState(null);
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
      //console.log(user.displayName);
    }
    if (user) {
      db.collection("users")
        .get()
        .then((querySnapshot) => {
          if (querySnapshot && isMountedRef.current) {
            console.log(querySnapshot.docs.map((doc) => doc.data()));
            setUsersData(querySnapshot.docs.map((doc) => doc.data()));
            setLoading(false);
          }
        });
      //console.log(user.displayName);
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
            <h1 className="titulo">ADMINISTRAR USUARIOS</h1>
            <div>
              <button className="btn btn-primary w-100 my-3">
                <FontAwesomeIcon icon={faUserPlus} /> AGREGAR USUARIO
              </button>
            </div>

            <Table responsive striped bordered hover variant="dark">
              <thead>
                <tr className="text-center">
                  <th>N°</th>
                  <th>NOMBRE</th>
                  <th>CORREO</th>
                  <th>ACCIONES</th>
                </tr>
              </thead>
              <tbody>
                {usersData &&
                  usersData.map((id, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{id.username}</td>
                      <td>{id.loginEmail}</td>
                      <td
                        colSpan="3"
                        className="d-flex justify-content-between"
                      >
                        <button className="btn btn-success mx-2">
                          <FontAwesomeIcon icon={faEye} /> Ver perfil
                        </button>

                        <button className="btn btn-warning mx-2">
                          <FontAwesomeIcon icon={faPencilAlt} /> Editar
                        </button>

                        <button className="btn btn-danger mx-2">
                          <FontAwesomeIcon icon={faUserSlash} /> Eliminar
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

export default Usuarios;
