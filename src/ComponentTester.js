//****************COMPONENTE PARA PRUEBAS EN GENERAL*********

import React, { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "./components/functions/UserProvider.js";
import { storage, firestore } from "./components/functions/Firebase.js";
import { faClosedCaptioning } from "@fortawesome/free-solid-svg-icons";

const ComponentTester = () => {
  const { user } = useContext(UserContext);
  const db = firestore;
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null); //AGREGAR EL PREVIEW DE LA IMAGEN QUE SE CARGA
  const [progress, setProgress] = useState(null);
  const [sending, setSending] = useState(false);
  const [addPhoto, setAddPhoto] = useState("");
  const [sent, setSent] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const isMountedRef = useRef(null);
  useEffect(() => {
    if (user && data) {
      setImageURL(data.photo);
    } else if (user && !data) {
      setImageURL(user.photoURL);
    }
  }, [user]);
  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      if (e.target.files[0].size > 262144000) {
        alert("La imagen pesa más de 250MB. Por favor, escoge otra.");
      } else {
        setImage(e.target.files[0]);
        setImageURL(URL.createObjectURL(e.target.files[0]));
        setPreview(URL.createObjectURL(e.target.files[0]));
      }
    }
  };
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
          }
        });
      // //console.log(user.displayName);
    } else {
      if (data) {
        //setData(null);
      }
    }

    return () => (isMountedRef.current = false);
  }, [user, db]);

  const handleUpload = () => {
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
        // console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(`${user.uid}_photo`)
          .getDownloadURL()
          .then((url) => {
            // console.log("imagen: ", url);
            setImageURL(url);
            setSent(true);
            setSending(false);
            window.location.reload();
          });
      }
    );
  };

  const createProfile = () => {
    // console.log("entro aca: ", data);
    isMountedRef.current = true;
    const newUserData = {
      nickName: user.displayName,
      photo: imageURL,
    };
    db.collection("users")
      .doc(user.uid)
      .set(newUserData)
      .then(() => {
        if (isMountedRef.current) {
          setData(newUserData);
          // console.log("new user data: ", newUserData);
        }
      });
    return () => (isMountedRef.current = false);
  };

  useEffect(() => {
    if (sent) {
      createProfile();
    }
  }, [sent]);

  if (loading) {
    return <div>LOADING..</div>;
  }
  return (
    <>
      <h1>Hola {data ? data.nickName : user ? user.displayName : null}</h1>
      <input
        onChange={onImageChange}
        id="group_image"
        type="file"
        className="filetype form-control-file"
        aria-describedby="fileHelp"
        accept="image/*"
      />
      <button onClick={() => handleUpload()}>Subir</button>
      <br />
      <img
        src={data ? data.photo : user ? user.photoURL : null}
        alt="loadedphoto"
        width="100px"
      />
      <div>
        {preview ? (
          <>
            <p>Preview de la foto cargada:</p>
            <img src={preview} alt="previsualizacion" width="100px" />
          </>
        ) : null}
      </div>
      {sending ? (
        <>
          <progress value={progress} max="100" />
          <p>ENVIANDO...</p>
        </>
      ) : null}

      <p>
        {/* {sent ? (
          // <>enviado!!!!!!!!!!! {console.log("se envio estos datos: ", data)} </>
        ) : null} */}
      </p>
    </>
  );
};

export default ComponentTester;
