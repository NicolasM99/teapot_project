import React, { useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Bienvenida from "./components/pages/Bienvenida.js";
import Categorias from "./components/pages/Categorias.js";
import Buscar from "./components/pages/Buscar.js";
import AcercaDe from "./components/pages/AcercaDe.js";
import Perfil from "./components/pages/Perfil.js";
import MisProyectos from "./components/pages/MisProyectos.js";
import PrimerRegistro from "./components/pages/PrimerRegistro.js";
import CategoriaIndividual from "./components/pages/CategoriaIndividual.js";
import { LoremIpsum } from "./components/pages/LoremIpsum";
import { UserContext } from "./components/functions/UserProvider";

const Container = () => {
  const user = useContext(UserContext);
  return (
    <div className="Wrapper">
      <Switch>
        <Route exact path="/">
          <Redirect to="/inicio" />
        </Route>
        <Route exact path="/inicio" component={Bienvenida} />
        <Route exact path="/categorias" component={Categorias} />
        <Route exact path="/buscar" component={Buscar} />
        <Route exact path="/acerca_de" component={AcercaDe} />
        <Route exact path="/mis_proyectos" component={MisProyectos} />
        <Route
          exact
          path="/categoria_produccion_3d"
          component={() => (
            <CategoriaIndividual
              titulo="PRODUCCIÓN 3D"
              descripcion={LoremIpsum}
            />
          )}
        />
        <Route
          exact
          path="/categoria_desarrollo"
          component={() => (
            <CategoriaIndividual titulo="DESARROLLO" descripcion={LoremIpsum} />
          )}
        />
        <Route
          exact
          path="/categoria_produccion_audiovisual"
          component={() => (
            <CategoriaIndividual
              titulo="PRODUCCIÓN AUDIOVISUAL"
              descripcion={LoremIpsum}
            />
          )}
        />
        <Route
          exact
          path="/categoria_diseno"
          component={() => (
            <CategoriaIndividual titulo="DISEÑO" descripcion={LoremIpsum} />
          )}
        />
        {user ? (
          <Route
            exact
            path="/mi_perfil"
            component={() => <Perfil user={user} />}
          />
        ) : null}
        {user ? (
          <Route
            exact
            path="/crear_perfil"
            component={() => <PrimerRegistro show_modal={true} />}
          />
        ) : null}
      </Switch>
    </div>
  );
};

export default Container;
