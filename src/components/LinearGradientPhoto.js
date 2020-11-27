import React, { useEffect } from "react";

const LinearGradientPhoto = ({ className, style, image }) => {
  useEffect(() => {
    // console.log(image);
  }, []);
  return (
    <div
      className={className}
      style={{
        // ...style,
        height: "100%",
        backgroundImage: `linear-gradient(to bottom, rgba(245, 246, 252, 0.52), rgba(117, 19, 93, 0.73)), url(${image})`,
        backgroundSize: "cover",
      }}
    ></div>
  );
};

export default LinearGradientPhoto;
