import React, { Component, useState } from "react";
import {
  Modal,
  Button,
  Row,
  Col,
  Form,
  ButtonGroup,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";

const PrimerRegistro = (props) => {
  const [profilePhoto, setProfilePhoto] = useState(props.photo);
  const [showSemesters, setShowSemesters] = useState(false);
  const [show, setShow] = useState(props.mostrar);
  const [continuar, setContinuar] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setProfilePhoto(URL.createObjectURL(event.target.files[0]));
    }
  };
  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      {...props}
    >
      <form method="get">
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
                  Nombre:
                </label>
                <input
                  autoComplete="on"
                  type="text"
                  className="form-control col-sm-11 col-md-11 col-lg-10 mx-auto"
                  id="nameInput"
                  placeholder="Nombre"
                  defaultValue={props.nombre}
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
                  defaultValue={props.email}
                />
              </div>
              <div className="row align-items-center my-3">
                <label
                  className="col-sm-12 col-md-12 col-lg-2"
                  htmlFor="photoInput"
                >
                  Foto de perfil:
                </label>
                <img
                  src={profilePhoto}
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
                />
              </div>
              <p>En este momento soy:</p>
              <ToggleButtonGroup type="radio" className="mb-2" name="estOeg">
                <ToggleButton
                  style={{ textTransform: "none" }}
                  value={1}
                  onChange={() => setShowSemesters(true)}
                >
                  Estudiante
                </ToggleButton>
                <ToggleButton
                  style={{ textTransform: "none" }}
                  value={2}
                  onChange={() => setShowSemesters(false)}
                >
                  Egresado
                </ToggleButton>
              </ToggleButtonGroup>
              <div>
                {showSemesters ? (
                  <>
                    <select className="custom-select px-3">
                      <option defaultValue="">Semestre actual</option>
                      <option value="1">Primero</option>
                      <option value="2">Segundo</option>
                      <option value="3">Tercero</option>
                      <option value="4">Cuarto</option>
                      <option value="5">Quinto</option>
                      <option value="6">Sexto</option>
                      <option value="7">Séptimo</option>
                      <option value="8">Octavo</option>
                      <option value="9">Noveno</option>
                      <option value="10">Décimo</option>
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
              onClick={handleClose}
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
