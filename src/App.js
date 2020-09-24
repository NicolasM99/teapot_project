import React from "react";
import Bienvenida from "./components/pages/Bienvenida.js";
import Categorias from "./components/pages/Categorias.js";
import MyNavbar2 from "./components/MyNavbar2.js";
import "react-pro-sidebar/dist/css/styles.css";
import { HashRouter, Redirect, Route } from "react-router-dom";

function App() {
  return (
    <HashRouter>
      <div className="container-fluid">
        <div className="row">
          <MyNavbar2 />
          <div className="col-lg-10 col-md-12 p-0">
            <div
              className="scrollContent"
              data-spy="scroll"
              data-target="#myNavbar"
              data-offset="0"
            >
              <Route exact path="/">
                <Redirect to="/inicio" />
              </Route>
              <Route exact path="/inicio" component={Bienvenida} />
              <Route exact path="/categorias" component={Categorias} />
            </div>
          </div>
        </div>
      </div>
    </HashRouter>
  );
  /**<HashRouter>
      <div className="container-fluid">
        <div className="row">
          <Navbar />
          <div className="col-lg-10 col-md-12 p-0">
            <Route exact path="/">
              <Redirect to="/inicio" />
            </Route>
            <Route exact path="/inicio" component={Bienvenida} />
            <Route exact path="/categorias" component={Categorias} />
          </div>
        </div>
      </div>
    </HashRouter> */
}
/**/
export default App;
