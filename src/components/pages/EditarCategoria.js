import React, { useState, useEffect, useContext, useRef } from "react";
import { Spring } from "react-spring/renderprops";
import { UserContext } from "../functions/UserProvider";
import { Link, useHistory } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { firestore, storage } from "../functions/Firebase.js";
import "../styles/contenido.css";
import "../styles/text-input-style.css";
import "../styles/loader.css";
import Resizer from "react-image-file-resizer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileUpload,
  faSave,
  faTimesCircle,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { ROUTES } from "../../constants/routes";

const EditarCategoria = ({ categoryInfo }) => {
  const isMountedRef = useRef(null);
  const history = useHistory();
  const [sending, setSending] = useState(false);
  const db = firestore;
  const [data, setData] = useState("");
  const [receivedData, setReceivedData] = useState("");
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  const [progress, setProgress] = useState(null);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(
    categoryInfo ? categoryInfo.image : null
  );
  const [addPhoto, setAddPhoto] = useState(
    categoryInfo ? categoryInfo.image : null
  );
  const [finishedImage, setFinishedImage] = useState(false);
  const [title, setTitle] = useState(categoryInfo ? categoryInfo.title : null);
  const [description, setDescription] = useState(
    categoryInfo ? categoryInfo.description : null
  );

  useEffect(() => {
    isMountedRef.current = true;
    if (user) {
      db.collection("categories")
        .get()
        .then((querySnapshot) => {
          if (querySnapshot && isMountedRef.current) {
            setReceivedData(querySnapshot.docs.map((doc) => doc.data()));
            setLoading(false);
          }
        });
    }

    return () => (isMountedRef.current = false);
  }, [user, db]);
  const handleUpload = (e) => {
    const imageID = Date.now();

    e.preventDefault();
    if (title && description) {
      if (image) {
        setSending(true);
        isMountedRef.current = true;
        const uploadTask = storage
          .ref(`categories/${user.uid}_category_image_${imageID}`)
          .put(image);
        uploadTask.on(
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
            // console.log(error);
          },
          () => {
            storage
              .ref("categories")
              .child(`${user.uid}_category_image_${imageID}`)
              .getDownloadURL()
              .then((url) => {
                if (isMountedRef.current) {
                  // console.log("imagen: ", url);
                  setAddPhoto(url);

                  setFinishedImage(true);
                } else {
                  // console.log("NO ENTRÓ");
                }
              });
          }
        );
      } else {
        setAddPhoto(categoryInfo.image);
        setFinishedImage(true);
      }
    }
    return () => (isMountedRef.current = false);
  };
  useEffect(() => {
    if (finishedImage && addPhoto) {
      const newCategoryData = {
        title: title,
        image: addPhoto,
        description: description,
        link: `categoria_${title.toLowerCase().replace(/ /g, "_")}`,
        id: categoryInfo.id,
      };
      if (
        user &&
        newCategoryData.title &&
        newCategoryData.image &&
        newCategoryData.link &&
        newCategoryData.description &&
        newCategoryData.id
      ) {
        db.collection("categories")
          .doc(newCategoryData.id)
          .update(newCategoryData)
          .then(() => {
            //if (isMountedRef.current) {
            setData(newCategoryData);
            // console.log("new category data: ", newCategoryData);
            //}
          })
          .then(() => {
            history.push(ROUTES.CATEGORIES);
            window.location.reload();
          });
        // //console.log(user.displayName);
      } else {
        if (data) {
          //setData(null);
        }
      }
    }
  }, [finishedImage]);
  // const handleSendData = (e) => {
  //   e.preventDefault();
  // };
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
        // console.log(resizedImage);
        setPreview(URL.createObjectURL(resizedImage));
      }
    }
  };
  if (loading) {
    return (
      <>
        <div className="contenido">
          <h1 className="text-center">Cargando, por favor espera...</h1>
          <div className="loader" />
        </div>
      </>
    );
  } else if (sending) {
    // // console.log("SENDING...");
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
              Creando categoría, por favor espera...
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
      <Spring
        from={{ opacity: 0, marginTop: -40 }}
        to={{ opacity: 1, marginTop: 0 }}
      >
        {(props) => (
          <div style={props}>
            <div className="contenido">
              <h1 className="titulo">EDITAR CATEGORIA</h1>
              {categoryInfo ? (
                <form>
                  <div className="row">
                    <label
                      className="col-sm-12 col-md-12 col-lg-1 input_label"
                      htmlFor="titleInput"
                    >
                      Título:
                    </label>
                    <input
                      defaultValue={categoryInfo.title}
                      autoComplete="off"
                      type="text"
                      name="titleInput"
                      id="titleInput"
                      onChange={(event) => setTitle(event.target.value)}
                      className="form-control col-md-8 mx-auto"
                      placeholder="Escribe aquí el título de la categoría"
                      style={{ backgroundColor: "white" }}
                    />
                  </div>

                  <div className="row">
                    <label
                      className="col-sm-12 col-md-12 col-lg-1 input_label"
                      htmlFor="descriptionInput"
                    >
                      Descripción:
                    </label>
                    <textarea
                      defaultValue={categoryInfo.description}
                      onChange={(event) => setDescription(event.target.value)}
                      autoComplete="off"
                      type="text"
                      name="descriptionInput"
                      id="descriptionInput"
                      className="form-control p-2 col-md-8 mx-auto"
                      placeholder="Descripción de la categoría"
                      style={{ backgroundColor: "white" }}
                    />
                  </div>
                  <div className="row">
                    <input
                      name="image-input"
                      id="image-input"
                      className="input"
                      onChange={onImageChange}
                      type="file"
                      accept="image/*"
                      style={{ textTransform: "none" }}
                    />
                    <div className="input-label col px-0">
                      <label
                        htmlFor="image-input"
                        className="btn btn-warning mx-auto col-md-4 "
                      >
                        <FontAwesomeIcon icon={faUpload} />
                        <b> Subir imagen de categoría</b>
                      </label>
                    </div>
                  </div>
                  {preview ? (
                    <div className="text-center col-12">
                      <img
                        src={preview}
                        className="col-md-6"
                        alt="preview_photo"
                        id="photoPreview"
                      />
                    </div>
                  ) : null}
                  <div className="text-center mt-3">
                    <Button
                      className="m-4"
                      variant="primary"
                      onClick={(e) => handleUpload(e)}
                    >
                      <FontAwesomeIcon icon={faSave} /> Actualizar categoría
                    </Button>
                    <Button
                      className="m-4"
                      variant="danger"
                      onClick={() => history.push(ROUTES.CATEGORIES)}
                    >
                      <FontAwesomeIcon icon={faTimesCircle} /> Cancelar
                    </Button>
                  </div>
                </form>
              ) : (
                <p className="text-center">
                  <b>
                    Parece que no has seleccionado una categoría. Por favor,
                    vuelve a la sección de{" "}
                    <Link to={ROUTES.CATEGORIES}>Categorías</Link> y selecciona
                    una
                  </b>
                </p>
              )}
            </div>
          </div>
        )}
      </Spring>
    );
  }
};

export default EditarCategoria;
