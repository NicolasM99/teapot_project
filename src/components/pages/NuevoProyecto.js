import React, { useState, useEffect, useContext, useRef } from "react";
import { Spring } from "react-spring/renderprops";
import { UserContext } from "../functions/UserProvider";
import { useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { firestore, storage } from "../functions/Firebase.js";
import "../styles/contenido.css";
import "../styles/text-input-style.css";
import "../styles/loader.css";
import Resizer from "react-image-file-resizer";

const NuevoProyecto = () => {
  const isMountedRef = useRef(null);
  const history = useHistory();
  const [sending, setSending] = useState(false);
  const db = firestore;
  const [data, setData] = useState("");
  const [receivedData, setReceivedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  const [progress, setProgress] = useState(null);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [addPhoto, setAddPhoto] = useState("");
  const [finishedImage, setFinishedImage] = useState(false);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [categoryList, setCategoryList] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    isMountedRef.current = true;
    if (user) {
      db.collection("projects")
        .doc(user.uid)
        .get()
        .then((doc) => {
          if (doc && isMountedRef.current) {
            setReceivedData(doc.data());
            console.log("ENTRO ACA");
          }
        })
        .then(() => {
          db.collection("categories")
            .get()
            .then((querySnapshot) => {
              if (querySnapshot && isMountedRef.current) {
                setCategoryList(querySnapshot.docs.map((doc) => doc.data()));
                console.log(querySnapshot.docs.map((doc) => doc.data()));
              }
              setLoading(false);
            });
        });
    }

    return () => (isMountedRef.current = false);
  }, [user, db]);
  const handleUpload = (e) => {
    const imageID = Date.now();
    e.preventDefault();
    if (title && description && selectedCategory) {
      if (image) {
        setSending(true);
        isMountedRef.current = true;
        const uploadTask = storage
          .ref(`projects/${user.uid}_project_image_${imageID}`)
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
            console.log(error);
          },
          () => {
            storage
              .ref("projects")
              .child(`${user.uid}_project_image_${imageID}`)
              .getDownloadURL()
              .then((url) => {
                if (isMountedRef.current) {
                  console.log("imagen: ", url);
                  setAddPhoto(url);

                  setFinishedImage(true);
                } else {
                  console.log("NO ENTRÓ");
                }
              });
          }
        );
      } else {
        setAddPhoto("");
        setFinishedImage(true);
      }
    }
    return () => (isMountedRef.current = false);
  };
  useEffect(() => {
    if (finishedImage && addPhoto) {
      var categoryProjects = [];
      categoryProjects = categoryList.filter(
        (category) => category.id === selectedCategory
      )[0].projects;
      // db.collection("categories")
      //   .doc(selectedCategory)
      //   .get()
      //   .then((doc) => {
      //     if (doc) {
      //       categoryProjects = doc.data();
      //     }
      //   });

      const newProjectData = {
        authorID: user.uid,
        title: title,
        image: addPhoto,
        description: description,
        link: `proyecto_${title.toLowerCase().replace(/ /g, "_")}`,
        id: `${categoryProjects.length}`,
      };
      if (
        user &&
        newProjectData.title &&
        newProjectData.image &&
        newProjectData.link &&
        newProjectData.description &&
        newProjectData.id
      ) {
        categoryProjects.push(newProjectData);
        db.collection("categories")
          .doc(selectedCategory)
          .set({ projects: categoryProjects }, { merge: true })
          .then(() => {
            history.push("/mis_proyectos");
            window.location.reload();
          });
        //console.log(user.displayName);
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
        console.log(resizedImage);
        setPreview(URL.createObjectURL(resizedImage));
      }
    }
  };
  useEffect(() => {
    if (selectedCategory) {
      var categoryProjects = [];
      db.collection("categories")
        .doc(selectedCategory)
        .get()
        .then((doc) => {
          if (doc && isMountedRef.current) {
            categoryProjects = doc.data().projects;
            console.log(categoryProjects);
          }
        });
    }
  }, [selectedCategory]);
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
              Creando proyecto, por favor espera...
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
              <h1 className="titulo">NUEVO PROYECTO</h1>
              <form>
                <div className="row">
                  <label
                    className="col-sm-12 col-md-12 col-lg-1 input_label"
                    htmlFor="titleInput"
                  >
                    Título:
                  </label>
                  <input
                    autoComplete="off"
                    type="text"
                    name="titleInput"
                    id="titleInput"
                    className="form-control col-md-8 mx-auto"
                    placeholder="Escribe aquí el título de tu proyecto"
                    style={{ backgroundColor: "white" }}
                    onChange={(event) => setTitle(event.target.value)}
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
                    onChange={(event) => setDescription(event.target.value)}
                    autoComplete="off"
                    type="text"
                    name="descriptionInput"
                    id="descriptionInput"
                    className="form-control p-2 col-md-8 mx-auto"
                    placeholder="Descripción del proyecto"
                    style={{ backgroundColor: "white" }}
                  />
                </div>
                <div className="row mt-2">
                  <label
                    className="col-sm-12 col-md-12 col-lg-1 input_label"
                    htmlFor="categoryInput"
                  >
                    Categoría:
                  </label>
                  <select
                    id="categoryInput"
                    name="categoryInput"
                    className="form-control p-2 col-md-8 mx-auto"
                    style={{ backgroundColor: "white" }}
                    onChange={(event) =>
                      setSelectedCategory(event.target.value)
                    }
                  >
                    <option value={""}>
                      Por favor, selecciona una categoría
                    </option>
                    {categoryList &&
                      categoryList.map((item) => (
                        <option value={item.id}>{item.title}</option>
                      ))}
                  </select>
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
                      <b>Subir imagen del proyecto</b>
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
                  <button
                    className="btn btn-primary"
                    onClick={(e) => handleUpload(e)}
                  >
                    Agregar nuevo proyecto
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </Spring>
    );
  }
};

export default NuevoProyecto;
