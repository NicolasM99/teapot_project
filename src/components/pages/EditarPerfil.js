import React, { useState, useEffect, useContext, useRef } from "react";
import Resizer from "react-image-file-resizer";
import { UserContext } from "../functions/UserProvider.js";
import { firestore, storage } from "../functions/Firebase.js";
import "../styles/text-input-style.css";
import "../styles/loader.css";
import { useHistory } from "react-router-dom";
import TerminosCondiciones from "./TerminosCondiciones.js";
import {
  Modal,
  Button,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";
import "../styles/primer_registro.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faFilePdf, faUpload } from "@fortawesome/free-solid-svg-icons";

const EditarPerfil = ({ showEditModal, setShowEditModal, existingData }) => {
  const history = useHistory();
  const { user } = useContext(UserContext);
  const [receivedData, setReceivedData] = useState(false);
  const db = firestore;
  const [data, setData] = useState(existingData);
  //const [send, setSend] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null); //AGREGAR EL PREVIEW DE LA IMAGEN QUE SE CARGA
  const [progress, setProgress] = useState(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  //const [imageURL, setImageURL] = useState("");
  const isMountedRef = useRef(null);
  const [showTerms, setShowTerms] = useState(null);

  const [certificates, setCertificates] = useState(null);
  const [showSemesters, setShowSemesters] = useState(existingData.student);
  const [showModal, setShowModal] = useState(true);
  //const [createProfile, setCreateProfile] = useState(false);
  const [addEmail, setAddEmail] = useState(existingData.email);
  const [addPhoto, setAddPhoto] = useState(existingData.photo);
  const [addPhone, setAddPhone] = useState(existingData.phone);
  const [addBio, setAddBio] = useState(existingData.bio);
  const [addExp, setAddExp] = useState(existingData.exp);
  const [addStudent, setAddStudent] = useState(existingData.student);
  const [addGraduated, setAddGraduated] = useState(existingData.graduated);
  const [addNickname, setAddNickname] = useState(existingData.nickName);
  const [addCertificate, setAddCertificate] = useState(
    existingData.certificate
  );
  const [addSemester, setAddSemester] = useState(existingData.semester);

  const [showNickname, setShowNickname] = useState(true);
  const [showEmail, setShowEmail] = useState(true);
  const [showPhoto, setShowPhoto] = useState(true);
  const [showPhone, setShowPhone] = useState(true);
  const [showStudentOrGraduated, setShowStudentOrGraduated] = useState(true);
  const [showBio, setShowBio] = useState(true);
  const [showSemester, setShowSemester] = useState(true);
  const [showExp, setShowExp] = useState(true);
  const [showCertificates, setShowCertificates] = useState(true);
  const [finishedImage, setFinishedImage] = useState(false);
  const [finishedCert, setFinishedCert] = useState(false);

  const [nombresCerts, setNombresCerts] = useState(
    existingData.certificate.map(
      (cert) =>
        cert
          .substring(cert.lastIndexOf("_certificate_"), cert.indexOf(".pdf"))
          .replace("_certificate_", "")
          .replace(/%20/g, " ") + ".pdf"
    )
  );

  const [enableContinue, setEnableContinue] = useState(false);
  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        800,
        800,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "blob"
      );
    });
  const onImageChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      if (e.target.files[0].size > 262144000) {
        alert("La imagen pesa más de 250MB. Por favor, escoge otra.");
      } else {
        const file = e.target.files[0];
        const resizedImage = await resizeFile(file);
        setImage(resizedImage);
        console.log(resizedImage);
        setPreview(URL.createObjectURL(resizedImage));
      }
    }
  };

  const onCertificateChange = (e) => {
    var certAux = nombresCerts;

    if (e.target.files) {
      const Files = e.target.files;
      var pass = 1;
      for (var i = 0; i < Files.length; i++) {
        if (Files[i].size > 262144000) {
          alert("El documento 250MB. Por favor, escoge otro.");
          pass = 0;
          i = Files.length;
        }
      }
      if (pass === 1) {
        Array.from(Files).forEach((file) => {
          nombresCerts.push(file.name);
          console.log(file.name);
        });
        setCertificates(Files);
      }
    }
  };

  //   useEffect(() => {
  //     // var certAux = nombresCerts;
  //     if (certificates) {
  //       Array.from(certificates).forEach((file) => {
  //         certAux.push(file.name);
  //         console.log(file.name);
  //       });
  //     }
  //     if (certAux.length > 0) {
  //       //   setNombresCerts(certAux);
  //     }
  //   }, [certificates]);

  useEffect(() => {
    isMountedRef.current = true;
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .get()
        .then((doc) => {
          if (doc && isMountedRef.current) {
            setData(doc.data());
            console.log("ENTRO ACA");
            // setReceivedData(true);
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
  const handleUpload = () => {
    isMountedRef.current = true;
    setSending(true);
    // let mounted = true;
    // let mounted2 = true;
    if (image) {
      const uploadTask = storage.ref(`images/${user.uid}_photo`).put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          setProgress(
            Math.round((100 * snapshot.bytesTransferred) / snapshot.totalBytes)
          );
          setSending(true);
        },
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(`${user.uid}_photo`)
            .getDownloadURL()
            .then((url) => {
              if (isMountedRef.current) {
                console.log("imagen: ", url);
                setAddPhoto(url);
                setFinishedImage(true);
              } else {
                console.log("NO ENTRÓ A LA FOTO");
              }
            });
        }
      );
    } else {
      setAddPhoto(existingData.photo);
      setFinishedImage(true);
    }
    if (certificates) {
      console.log("certificates state: ", certificates[0].name);
      var sendCertificates = existingData.certificate;
      for (var i = 0; i < certificates.length; i++) {
        const auxI = i;
        const name = certificates[i].name;
        const uploadTaskCert = storage
          .ref(`certificates/${user.uid}_certificate_${name}`)
          .put(certificates[i]);

        uploadTaskCert.on(
          "state_changed",
          (snapshot) => {
            setProgress(
              Math.round(
                (100 * snapshot.bytesTransferred) / snapshot.totalBytes
              )
            );
            setSending(true);
          },
          (error) => {
            console.log(error);
          },
          () => {
            storage
              .ref("certificates")
              .child(`${user.uid}_certificate_${name}`)
              .getDownloadURL()
              .then((url) => {
                if (isMountedRef.current) {
                  sendCertificates.push(url);
                  console.log(
                    sendCertificates.length,
                    certificates.length,
                    existingData.certificate.length,
                    nombresCerts.length
                  );
                } else {
                  console.log("NO ENTRÓ AL CERTIFICADO");
                }
              })
              .then(() => {
                if (sendCertificates.length === nombresCerts.length) {
                  console.log("ENTRÓ A VALIDAR AUXILIAR", sendCertificates);
                  setAddCertificate(sendCertificates);
                }
              })
              .then(() => {
                if (sendCertificates.length === nombresCerts.length) {
                  console.log(auxI, certificates.length);
                  console.log("ADD CERTIFICATE: ", addCertificate);
                  setFinishedCert(true);
                }
              });
          }
        );
      }
    } else setFinishedCert(true);
    return () => {
      isMountedRef.current = false;
    };
  };
  useEffect(() => {
    if (finishedImage && finishedCert) {
      setSent(true);
      handleClose();
      setSending(false);
    }
  }, [finishedCert, finishedImage]);

  const createProfile = () => {
    isMountedRef.current = true;
    if (!image) {
      setAddPhoto(existingData.photo);
    }
    const newUserData = {
      id: user.uid,
      //   admin: false,
      username: user.displayName,
      loginEmail: user.email,
      nickName: addNickname,
      email: addEmail,
      phone: addPhone,
      photo: addPhoto,
      bio: addBio,
      student: addStudent,
      graduated: addGraduated,
      semester: addSemester,
      exp: addExp,
      certificate: addCertificate,
      show_nickname: showNickname,
      show_email: showEmail,
      show_photo: showPhoto,
      show_phone: showPhone,
      show_bio: showBio,
      show_st_or_grad: showStudentOrGraduated,
      show_semester: showSemester,
      show_exp: showExp,
      show_certificates: showCertificates,
    };
    db.collection("users")
      .doc(user.uid)
      .update(newUserData)
      .then(() => {
        //if (isMountedRef.current) {
        setData(newUserData);
        console.log("new user data: ", newUserData);
        //}
      })
      .then(() => {
        history.push("/perfil");
        window.location.reload();
      });
    return () => (isMountedRef.current = false);
  };
  useEffect(() => {
    if (sent) {
      createProfile();
    }
  }, [sent]);

  function handlePhoneChange(e) {
    setAddPhone(e.target.value);
  }
  function handleNickNameChange(e) {
    setAddNickname(e.target.value);
  }
  function handleEmailChange(e) {
    setAddEmail(e.target.value);
  }
  function handleBioChange(e) {
    setAddBio(e.target.value);
  }
  function handleExpChange(e) {
    setAddExp(e.target.value);
  }
  function GraduatedFunc(e) {
    setShowSemesters(false);
    //setAddEstOrEg("egresado");
    setAddStudent(false);
    setAddGraduated(true);
    setAddSemester("0");
  }
  function StudentFunc(e) {
    setAddGraduated(false);
    setAddStudent(true);
    setShowSemesters(true);
  }
  function handleSemesterChange(e) {
    setAddSemester(e.target.value);
  }

  function handleShowNickname(e) {
    setShowNickname(!showNickname);
  }
  function handleShowEmail(e) {
    setShowEmail(!showEmail);
  }
  function handleShowPhoto(e) {
    setShowPhoto(!showPhoto);
  }
  function handleShowPhone(e) {
    setShowPhone(!showPhone);
  }
  function handleShowBio(e) {
    setShowBio(!showBio);
  }
  function handleShowStOrGrad(e) {
    setShowStudentOrGraduated(!showStudentOrGraduated);
  }
  function handleShowSemester(e) {
    setShowSemester(!showSemester);
  }
  function handleShowExp(e) {
    setShowExp(!showExp);
  }
  function handleShowCertificates(e) {
    setShowCertificates(!showCertificates);
  }
  const handleClose = () => setShowEditModal(false);
  const handleCloseTerms = () => setShowTerms(false);

  if (sending) {
    // console.log("SENDING...");
    return (
      <>
        <Modal
          size="md"
          show={true}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body>
            <h1 style={{ textAlign: "center" }}>
              Creando perfil, por favor espera...
            </h1>
            <div className="loader"></div>
            <div className="mx-auto" style={{ width: "130px" }}>
              <progress value={progress} max="100" />
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
  } else {
    return (
      <>
        <Modal
          show={showEditModal}
          onHide={handleClose}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <form id="perfilForm" method="get">
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                <b>Editar perfil</b>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="container">
                <div className="form-group">
                  <div className="row align-items-center  my-3">
                    <label
                      className="col-sm-12 col-md-12 col-lg-2"
                      htmlFor="nickNameInput"
                    >
                      Nombre de usuario:
                    </label>
                    <input
                      autoComplete="on"
                      type="text"
                      className="form-control col-sm-11 col-md-11 col-lg-10 mx-auto"
                      id="nickNameInput"
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
                      defaultValue={addEmail}
                      onChange={handleEmailChange}
                    />
                    <small
                      id="emailHelp"
                      className="form-text text-muted col-sm-11 col-md-11 col-lg-10 mx-auto"
                    >
                      Esta dirección de correo es la que se mostrará en tu
                      sección de Contacto, pero no se usará para iniciar sesión.{" "}
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
                        width: "150px",
                        height: "150px",
                        objectFit: "cover",
                        borderRadius: "50%",
                        margin: "auto",
                        marginBottom: "10px",
                      }}
                      alt="profile_photo"
                      id="photoInput"
                    />
                    <br />
                    {preview ? (
                      <>
                        <label
                          className="col-sm-12 col-md-12 col-lg-2"
                          htmlFor="photoPreview"
                        >
                          Nueva foto:
                        </label>
                        <img
                          src={preview}
                          style={{
                            width: "150px",
                            height: "150px",
                            objectFit: "cover",
                            borderRadius: "50%",
                            margin: "auto",
                            marginBottom: "10px",
                          }}
                          alt="preview_photo"
                          id="photoPreview"
                        />
                      </>
                    ) : null}

                    <div className="mx-auto col-md-12 col-lg-6">
                      <input
                        name="image-input"
                        id="image-input"
                        className="input"
                        onChange={onImageChange}
                        type="file"
                        accept="image/*"
                        style={{ textTransform: "none" }}
                      />
                      <div className="input-label">
                        <label
                          htmlFor="image-input"
                          className="btn btn-warning"
                          style={{ textTransform: "none" }}
                        >
                          <FontAwesomeIcon icon={faUpload} /> Subir una nueva
                          foto
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row align-items-center my-3">
                    <label
                      className="col-sm-12 col-md-12 col-lg-2"
                      htmlFor="phoneInput"
                    >
                      Número de teléfono:
                    </label>
                    <input
                      autoComplete="on"
                      type="tel"
                      className="form-control col-sm-11 col-md-11 col-lg-10 mx-auto"
                      id="phoneInput"
                      placeholder="Ej: +57 300 123 45 67"
                      defaultValue={addPhone}
                      onChange={handlePhoneChange}
                    />
                  </div>
                  <p>En este momento soy:</p>
                  <ToggleButtonGroup
                    type="radio"
                    className="mb-2"
                    name="stOrGrad"
                    defaultValue={
                      existingData.student ? 1 : existingData.graduated ? 2 : 0
                    }
                  >
                    <ToggleButton
                      style={{ textTransform: "none" }}
                      value={1}
                      onChange={StudentFunc}
                    >
                      Estudiante
                    </ToggleButton>
                    <ToggleButton
                      style={{ textTransform: "none" }}
                      value={2}
                      defaultChecked={true}
                      onChange={GraduatedFunc}
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
                          defaultValue={
                            existingData.student ? existingData.semester : ""
                          }
                        >
                          <option value="">Semestre actual</option>
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
                      htmlFor="bioInput"
                    >
                      Biografía
                    </label>
                    <textarea
                      className="col-sm-11 col-md-11 col-lg-10 mx-auto"
                      id="bioInput"
                      placeholder="Escribe aquí algo que quieras contar sobre ti..."
                      rows="3"
                      onChange={handleBioChange}
                      defaultValue={addBio}
                    />
                  </div>
                  <div className="row align-items-center my-3">
                    <label
                      className="col-sm-12 col-md-12 col-lg-2"
                      htmlFor="expInput"
                    >
                      Experiencia laboral
                    </label>
                    <textarea
                      className="col-sm-11 col-md-11 col-lg-10 mx-auto"
                      id="expInput"
                      placeholder="Escribe aquí tu experiencia laboral..."
                      rows="3"
                      onChange={handleExpChange}
                      defaultValue={addExp}
                    />
                  </div>
                  <div className="row align-items-center my-3">
                    <label
                      className="col-sm-12 col-md-12 col-lg-2"
                      htmlFor="certInput"
                    >
                      Certificados de estudios/cursos (PDF):
                    </label>
                    <div className="col-md-12 col-lg-6 p-0">
                      <input
                        multiple
                        id="cert-input"
                        name="cert-input"
                        type="file"
                        className="input"
                        aria-describedby="fileHelp"
                        accept="application/pdf"
                        onChange={onCertificateChange}
                      />
                      <div className="input-label">
                        <label
                          htmlFor="cert-input"
                          className="btn btn-warning"
                          style={{ textTransform: "none", textAlign: "left" }}
                        >
                          <FontAwesomeIcon icon={faUpload} /> Subir certificados
                        </label>
                      </div>
                      {nombresCerts &&
                        nombresCerts.map((item) => (
                          <p>
                            <FontAwesomeIcon icon={faFilePdf} /> {item}
                          </p>
                        ))}
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
                    aria-controls="public_info"
                    className="mb-3"
                  >
                    <FontAwesomeIcon icon={faEye} /> Configurar datos personales
                    públicos
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
                        id="nickNameCheckbox"
                        className="custom-control-input"
                        onChange={handleShowNickname}
                        defaultChecked
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="nickNameCheckbox"
                      >
                        Nombre
                      </label>
                    </div>

                    <div className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        id="emailCheckbox"
                        className="custom-control-input"
                        onChange={handleShowEmail}
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
                        id="photoCheckbox"
                        className="custom-control-input"
                        onChange={handleShowPhoto}
                        defaultChecked
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="photoCheckbox"
                      >
                        Foto de perfil
                      </label>
                    </div>
                    <div className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        id="phoneCheckbox"
                        className="custom-control-input"
                        onChange={handleShowPhone}
                        defaultChecked
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="phoneCheckbox"
                      >
                        Teléfono
                      </label>
                    </div>

                    <div className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        id="stOrGradCheckbox"
                        className="custom-control-input"
                        onChange={handleShowStOrGrad}
                        defaultChecked
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="stOrGradCheckbox"
                      >
                        Estudiante o egresado
                      </label>
                    </div>

                    <div className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        id="semesterCheckbox"
                        className="custom-control-input"
                        onChange={handleShowSemester}
                        defaultChecked
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="semesterCheckbox"
                      >
                        Semestre (si es estudiante actualmente)
                      </label>
                    </div>

                    <div className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        id="bioCheckbox"
                        className="custom-control-input"
                        onChange={handleShowBio}
                        defaultChecked
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="bioCheckbox"
                      >
                        Biografía
                      </label>
                    </div>

                    <div className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        id="expCheckbox"
                        className="custom-control-input"
                        onChange={handleShowExp}
                        defaultChecked
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="expCheckbox"
                      >
                        Experiencia laboral
                      </label>
                    </div>

                    <div className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        id="certCheckbox"
                        className="custom-control-input"
                        onChange={handleShowCertificates}
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
              <Button
                style={{ textTransform: "none" }}
                variant="success"
                onClick={() => handleUpload()}
              >
                <b>Actualizar perfil</b>
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
      </>
    );
  }
};

export default EditarPerfil;
