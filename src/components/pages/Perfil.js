import React, { useState, useEffect, useContext, useRef } from "react";
import { firestore } from "../functions/Firebase.js";
import "../styles/contenido.css";
import { Button } from "react-bootstrap";
import { UserContext } from "../functions/UserProvider";
import "../styles/loader.css";
import { Spring } from "react-spring/renderprops";

const Perfil = (props) => {
  const isMountedRef = useRef(null);
  const [data, setData] = useState("");
  const [receivedData, setReceivedData] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  const db = firestore;
  useEffect(() => {
    isMountedRef.current = true;
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .get()
        .then((doc) => {
          if (doc && isMountedRef.current) {
            setData(doc.data());
            setLoading(false);
            console.log("ENTRO ACA");
            setReceivedData(true);
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
  const userData = data;
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
            <>
              <div className="wrapper">
                <div className="contenido">
                  {userData ? (
                    <>
                      <h1 className="titulo">PERFIL</h1>
                      {userData.show_nickname ? (
                        <h2>Nombre de usuario: {userData.nickName} </h2>
                      ) : null}
                      {userData.show_email ? (
                        <p>Email: {userData.email} </p>
                      ) : null}
                      {userData.show_photo ? (
                        <img
                          src={userData.photo}
                          alt="profilePic"
                          style={{
                            width: "200px",
                            height: "200px",
                            objectFit: "cover",
                            borderRadius: "50%",
                            margin: "auto",
                            marginBottom: "10px",
                          }}
                        />
                      ) : null}
                      {userData.show_phone ? (
                        <p>Teléfono: {userData.phone}</p>
                      ) : null}
                      {userData.show_st_or_grad ? (
                        <>
                          {userData.student ? (
                            <>
                              <p>
                                Estudiante{" "}
                                {userData.show_semester ? (
                                  <>
                                    actualmente en {userData.semester} semestre
                                  </>
                                ) : null}
                              </p>
                            </>
                          ) : (
                            <>
                              <p>Egresado</p>
                            </>
                          )}
                        </>
                      ) : null}
                      {userData.show_bio ? (
                        <p>Biografía: {userData.bio}</p>
                      ) : null}
                      {userData.show_exp ? (
                        <p>Experiencia laboral: {userData.exp}</p>
                      ) : null}
                      {userData.show_certificates ? (
                        <p>Certificados: {userData.certificate}</p>
                      ) : null}
                    </>
                  ) : (
                    <div
                      className="col-12 align-items-center"
                      style={{ textAlign: "center" }}
                    >
                      <h2>
                        Parece que no has creado un perfil. ¡Es un buen momento
                        para crearlo!
                      </h2>
                      {console.log(loading)}
                      <Button variant="success" href="#crear_perfil">
                        Crear perfil
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </>
          </div>
        )}
      </Spring>
    );
  }
};

export default Perfil;
