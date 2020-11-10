import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Container } from "react-bootstrap";
import TerminosCondiciones from "./TerminosCondiciones";
import { Controller, useForm } from "react-hook-form";
const NuevoUsuario = ({ show, setShowNewUser }) => {
  //   const [showModal, setShowModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const handleCloseModal = () => setShowNewUser(false);
  const handleCloseTermsModal = () => setShowTermsModal(false);
  useEffect(() => {
    setShowNewUser(show);
  }, [show, setShowNewUser]);

  const onSubmit = (data) => {
    console.log("ON SUBMIT", data);
  };
  const { control, register, getValues, handleSubmit, errors } = useForm();
  useEffect(() => {
    console.log(errors);
  }, [errors]);
  return (
    <Container>
      <Modal
        show={showTermsModal}
        onHide={handleCloseTermsModal}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Términos y condiciones
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TerminosCondiciones />
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{ textTransform: "none" }}
            variant="danger"
            onClick={() => handleCloseTermsModal()}
          >
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal size="md" onHide={handleCloseModal} show={show}>
        <Modal.Header closeButton>
          <Modal.Title>Nuevo usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            ANTES DE CONTINUAR: Solicita al usuario que inicie sesión con Google
            para poder crear su perfil.
          </p>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="nickName">
              <Form.Label>Nombre de usuario</Form.Label>
              <Controller
                defaultValue=""
                render={(props) => (
                  <Form.Control
                    {...props}
                    defaultValue={getValues("nickName")}
                    value={getValues("nickName")}
                    ref={register}
                    type="text"
                    placeholder="Ingresa el nombre"
                    isInvalid={!!errors.nickName}
                  />
                )}
                control={control}
                name="nickName"
                rules={{
                  required: "El campo es requerido",
                }}
              />
              {errors.nickName && (
                <Form.Control.Feedback type="invalid">
                  {errors.nickName.message || "Campo requerido"}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Correo</Form.Label>
              <Controller
                defaultValue=""
                render={(props) => (
                  <Form.Control
                    {...props}
                    defaultValue={getValues("email")}
                    value={getValues("email")}
                    ref={register}
                    type="email"
                    placeholder="Ingresa el correo"
                    isInvalid={!!errors.email}
                  />
                )}
                control={control}
                name="email"
                rules={{
                  required: "El campo es requerido",
                  pattern: {
                    value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Correo inválido",
                  },
                }}
              />
              {errors.email && (
                <Form.Control.Feedback type="invalid">
                  {errors.email.message || "Campo requerido"}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            {/* <Form.Check
              ref={register}
              id="validationFormik0"
              required
              name="terms"
              label="Acepto los términos y condiciones"
            /> */}
            <Button
              onClick={handleSubmit(onSubmit)}
              variant="success"
              style={{ textTransform: "none" }}
            >
              Crear perfil
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {/* <Form.Check.Input id="terms-check" />
          <Form.Check.Label htmlFor="terms-check">
            Acepto los{" "}
            <a href="#" onClick={() => setShowTermsModal(true)}>
              {" "}
              términos y condiciones.
            </a>
          </Form.Check.Label> */}
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default NuevoUsuario;
