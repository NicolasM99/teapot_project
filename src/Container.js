import React, { useContext, useState, useEffect, useRef } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Bienvenida from "./components/pages/Bienvenida.js";
import Categorias from "./components/pages/Categorias.js";
import Buscar from "./components/pages/Buscar.js";
import AcercaDe from "./components/pages/AcercaDe.js";
import Perfil from "./components/pages/Perfil.js";
import MisProyectos from "./components/pages/MisProyectos.js";
import PrimerRegistro from "./components/pages/PrimerRegistro.js";
import CategoriaIndividual from "./components/pages/CategoriaIndividual.js";
import NuevaCategoria from "./components/pages/NuevaCategoria";
import { LoremIpsum } from "./components/pages/LoremIpsum";
import { UserContext } from "./components/functions/UserProvider";
import Usuarios from "./components/pages/Usuarios.js";
import { firestore } from "./components/functions/Firebase.js";
import SolicitudesProyectos from "./components/pages/SolicitudesProyectos";
import NuevoProyecto from "./components/pages/NuevoProyecto.js";
import ProyectoIndividual from "./components/pages/ProyectoIndividual.js";

const Container = ({ publicUserData, setPublicUserData }) => {
  const [categoryInfo, setCategoryInfo] = useState(null);
  const [projectInfo, setProjectInfo] = useState(null);
  const [userData, setUserData] = useState(null);

  const db = firestore;
  const { user } = useContext(UserContext);
  const isMountedRef = useRef(null);
  useEffect(() => {
    isMountedRef.current = true;
    if (user && db) {
      db.collection("users")
        .doc(user.uid)
        .get()
        .then((doc) => {
          if (doc && isMountedRef.current) {
            setUserData(doc.data());
            console.log(doc.data());
          }
        });
      //console.log(user.displayName);
    }
    return () => (isMountedRef.current = false);
  }, [user, db]);
  return (
    <div className="Wrapper">
      <Switch>
        <Route exact path="/">
          <Redirect to="/inicio" />
        </Route>
        <Route exact path="/inicio" component={Bienvenida} />
        <Route
          exact
          path="/categorias"
          component={() => <Categorias setCategoryInfo={setCategoryInfo} />}
        />
        <Route
          exact
          path="/buscar"
          component={() => (
            <Buscar
              publicUserData={publicUserData}
              setPublicUserData={setPublicUserData}
            />
          )}
        />
        <Route exact path="/acerca_de" component={AcercaDe} />
        <Route
          exact
          path="/mis_proyectos"
          component={() => <MisProyectos setProjectInfo={setProjectInfo} />}
        />
        <Route
          exact
          path="/categoria"
          component={() => <CategoriaIndividual categoryInfo={categoryInfo} />}
        />
        <Route
          exact
          path="/proyecto"
          component={() => <ProyectoIndividual projectInfo={projectInfo} />}
        />

        <Route
          exact
          path="/perfil"
          component={() => (
            <Perfil
              user={user}
              setProjectInfo={setProjectInfo}
              publicUserData={publicUserData}
            />
          )}
        />

        {user ? (
          <Route
            exact
            path="/crear_perfil"
            component={() => <PrimerRegistro show_modal={true} />}
          />
        ) : null}
        {user && userData && userData.admin ? (
          <Route
            exact
            path="/nueva_categoria"
            component={() => <NuevaCategoria />}
          />
        ) : null}
        {user && userData ? (
          <Route
            exact
            path="/nuevo_proyecto"
            component={() => <NuevoProyecto />}
          />
        ) : null}
        {user && userData && userData.admin ? (
          <Route
            exact
            path="/usuarios"
            component={() => <Usuarios setPublicUserData={setPublicUserData} />}
          />
        ) : null}
        {user && userData && userData.admin ? (
          <Route
            exact
            path="/solicitudes_proyectos"
            component={() => <SolicitudesProyectos />}
          />
        ) : null}
      </Switch>
    </div>
  );
};

export default Container;
