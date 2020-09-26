import React, { useState } from "react";
import {
  Modal,
  Button,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";
import "firebase/auth";

const PrimerRegistro = (props) => {
  const db = props.mydb;
  const user = props.user;
  const [showSemesters, setShowSemesters] = useState(false);
  const [mostrar, setShow] = useState(props.mostrar);
  const [continuar, setContinuar] = useState(false);
  const [addEmail, setAddEmail] = useState(user.email);
  const [addPhoto, setAddPhoto] = useState(user.photoURL);
  const [addPhone, setAddPhone] = useState("");
  const [addExp, setAddExp] = useState("");
  const [addEstudiante, setAddEstudiante] = useState(false);
  const [addEgresado, setAddEgresado] = useState(false);
  const [addEstOrEg, setAddEstOrEg] = useState("");
  const [addNickname, setAddNickname] = useState(user.displayName);
  const [addSemester, setAddSemester] = useState("0");
  function handlePhoneChange(e) {
    setAddPhone(e.target.value);
  }
  function handleNickNameChange(e) {
    setAddNickname(e.target.value);
  }
  function handleEmailChange(e) {
    setAddEmail(e.target.value);
  }
  function handleExpChange(e) {
    setAddExp(e.target.value);
  }
  function EgresadoFunc(e) {
    setShowSemesters(false);
    //setAddEstOrEg("egresado");
    setAddEstudiante(false);
    setAddEgresado(true);
    setAddSemester("0");
  }
  function EstudianteFunc(e) {
    setAddEgresado(false);
    setAddEstudiante(true);
    setShowSemesters(true);
    setAddEstOrEg("estudiante");
  }
  function handleSemesterChange(e) {
    setAddSemester(e.target.value);
  }
  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setAddPhoto(URL.createObjectURL(event.target.files[0]));
    }
  };
  const createProfile = () => {
    handleClose();
    return db.collection("users").doc(user.uid).set({
      nickName: addNickname,
      email: addEmail,
      profilePic: addPhoto,
      tel: addPhone,
      estudiante: addEstudiante,
      egresado: addEgresado,
      semestre: addSemester,
      exp: addExp,
    });
  };
  return (
    <Modal
      show={mostrar}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      {...props}
    >
      <form id="perfilForm" method="get">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Crear perfil
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <h5 className="text-center mb-3">
              ¡Gracias por hacer parte de nuestra comunidad! <br />
              <br />
              Te invitamos a llenar el siguiente formulario para crear tu
              perfil.
              <br />
              <br /> También puedes dejar los valores por defecto y editarlos en
              otro momento.
            </h5>

            <div className="form-group">
              <div className="row align-items-center  my-3">
                <label
                  className="col-sm-12 col-md-12 col-lg-2"
                  htmlFor="nameInput"
                >
                  Nombre de usuario:
                </label>
                <input
                  autoComplete="on"
                  type="text"
                  className="form-control col-sm-11 col-md-11 col-lg-10 mx-auto"
                  id="nameInput"
                  placeholder="Nombre"
                  defaultValue={addNickname}
                  onChange={handleNickNameChange}
                />
              </div>
              <div className="row align-items-center my-3">
                <label
                  className="col-sm-12 col-md-12 col-lg-2"
                  htmlFor="emailInput"
                >
                  Email:
                </label>
                <input
                  autoComplete="on"
                  type="text"
                  className="form-control col-sm-11 col-md-11 col-lg-10 mx-auto"
                  id="emailInput"
                  placeholder="Email"
                  defaultValue={user.email}
                  onChange={handleEmailChange}
                />
                <small
                  id="emailHelp"
                  className="form-text text-muted col-sm-11 col-md-11 col-lg-10 mx-auto"
                >
                  Esta dirección de correo es la que se mostrará en tu sección
                  de Contacto, pero no se usará para iniciar sesión.{" "}
                  <b>Tu cuenta seguira asociada con la de Google.</b>
                </small>
              </div>
              <div className="row align-items-center my-3">
                <label
                  className="col-sm-12 col-md-12 col-lg-2"
                  htmlFor="photoInput"
                >
                  Foto de perfil:
                </label>
                <img
                  src={addPhoto}
                  style={{
                    width: "200px",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "50%",
                    margin: "auto",
                    marginBottom: "10px",
                  }}
                  alt="profile_photo"
                  id="photoInput"
                />
                <div className="mx-auto col-md-12 col-lg-6">
                  <input
                    onChange={onImageChange}
                    id="group_image"
                    type="file"
                    className="filetype form-control-file"
                    aria-describedby="fileHelp"
                  />
                </div>
              </div>
              <div className="row align-items-center my-3">
                <label
                  className="col-sm-12 col-md-12 col-lg-2"
                  htmlFor="telInput"
                >
                  Número de teléfono:
                </label>
                <input
                  autoComplete="on"
                  type="tel"
                  className="form-control col-sm-11 col-md-11 col-lg-10 mx-auto"
                  id="telInput"
                  placeholder="Ej: +57 300 123 45 67"
                  defaultValue={props.tel}
                  onChange={handlePhoneChange}
                />
              </div>
              <p>En este momento soy:</p>
              <ToggleButtonGroup type="radio" className="mb-2" name="estOeg">
                <ToggleButton
                  style={{ textTransform: "none" }}
                  value={1}
                  onChange={EstudianteFunc}
                >
                  Estudiante
                </ToggleButton>
                <ToggleButton
                  style={{ textTransform: "none" }}
                  value={2}
                  onChange={EgresadoFunc}
                >
                  Egresado
                </ToggleButton>
              </ToggleButtonGroup>
              <div>
                {showSemesters ? (
                  <>
                    <select
                      className="custom-select px-3"
                      onChange={handleSemesterChange}
                    >
                      <option defaultValue="">Semestre actual</option>
                      <option value="Primer">Primero</option>
                      <option value="Segundo">Segundo</option>
                      <option value="Tercer">Tercero</option>
                      <option value="Cuarto">Cuarto</option>
                      <option value="Quinto">Quinto</option>
                      <option value="Sexto">Sexto</option>
                      <option value="Séptimo">Séptimo</option>
                      <option value="Octavo">Octavo</option>
                      <option value="Noveno">Noveno</option>
                      <option value="Décimo">Décimo</option>
                    </select>
                  </>
                ) : (
                  <></>
                )}
              </div>
              <div className="row align-items-center my-3">
                <label
                  className="col-sm-12 col-md-12 col-lg-2"
                  htmlFor="expInput"
                >
                  Experiencia laboral
                </label>
                <textarea
                  className="form-control col-sm-11 col-md-11 col-lg-10 mx-auto"
                  id="expInput"
                  placeholder="Escribe aquí tu experiencia laboral"
                  rows="3"
                  onChange={handleExpChange}
                />
              </div>
              <div className="row align-items-center my-3">
                <label
                  className="col-sm-12 col-md-12 col-lg-2"
                  htmlFor="expInput"
                >
                  Certificados de estudios/cursos:
                </label>
                <div className="mx-auto col-md-12 col-lg-6">
                  <input
                    id="cert_input"
                    type="file"
                    className="filetype form-control-file"
                    aria-describedby="fileHelp"
                  />
                </div>
              </div>
            </div>
            <div className="text-center">
              <Button
                style={{ textTransform: "none" }}
                variant="danger"
                data-toggle="collapse"
                data-target="#public_info"
                aria-expanded="false"
                aria-controls="collapseExample"
                className="mb-3"
              >
                Configuración de datos personales públicos
              </Button>
            </div>
            <div className="collapse" id="public_info">
              <p>
                Por defecto, esta información será la que se mostrará
                públicamente en la sección <b>Contacto</b> de tu perfil. Si
                quieres personalizar cuáles datos <b>mostrar</b>, por favor
                escógelos a continuación:
              </p>

              <div className="form-group">
                <div className="custom-control custom-checkbox ">
                  <input
                    type="checkbox"
                    id="nameCheckbox"
                    className="custom-control-input"
                    defaultChecked
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="nameCheckbox"
                  >
                    Nombre
                  </label>
                </div>

                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    id="emailCheckbox"
                    className="custom-control-input"
                    defaultChecked
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="emailCheckbox"
                  >
                    Email
                  </label>
                </div>
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    id="fotoCheckbox"
                    className="custom-control-input"
                    defaultChecked
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="fotoCheckbox"
                  >
                    Foto de perfil
                  </label>
                </div>
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    id="telCheckbox"
                    className="custom-control-input"
                    defaultChecked
                  />
                  <label className="custom-control-label" htmlFor="telCheckbox">
                    Teléfono
                  </label>
                </div>

                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    id="estOegCheckbox"
                    className="custom-control-input"
                    defaultChecked
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="estOegCheckbox"
                  >
                    Estudiante o egresado
                  </label>
                </div>

                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    id="semestreCheckbox"
                    className="custom-control-input"
                    defaultChecked
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="semestreCheckbox"
                  >
                    Semestre (si es estudiante actualmente)
                  </label>
                </div>

                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    id="expCheckbox"
                    className="custom-control-input"
                    defaultChecked
                  />
                  <label className="custom-control-label" htmlFor="expCheckbox">
                    Experiencia laboral
                  </label>
                </div>

                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    id="certCheckbox"
                    className="custom-control-input"
                    defaultChecked
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="certCheckbox"
                  >
                    Certificados de estudios/cursos
                  </label>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              id="termsCheckbox"
              className="custom-control-input"
              required
              onChange={() => setContinuar(!continuar)}
            />
            <label className="custom-control-label" htmlFor="termsCheckbox">
              Acepto los <a href="#"> términos y condiciones.</a>
            </label>
          </div>
          {continuar ? (
            <Button
              style={{ textTransform: "none" }}
              variant="success"
              onClick={createProfile}
              href="#mi_perfil"
            >
              Continuar
            </Button>
          ) : (
            <Button
              style={{ textTransform: "none" }}
              variant="success"
              disabled
            >
              Continuar
            </Button>
          )}
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default PrimerRegistro;
