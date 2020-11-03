import React from "react";
import "./styles/ParticlesStyle.css";
import Particles from "react-particles-js";
const ParticlesScreen = (props) => {
  return (
    <div>
      <div
        style={{
          textAlign: "center",
        }}
      >
        {/* <h1>FONDO CON PARTICLES.JS</h1> */}
      </div>

      <Particles
        style={{
          ...props.style,
          // position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
        }}
        width={props.width}
        height={props.height}
        params={{
          particles: {
            move: {
              speed: 1.5,
            },
            number: {
              value: 40,
              density: {
                enable: true,
                value_area: 800,
              },
            },
            size: {
              value: 2.5,
            },

            line_linked: {
              enable: true,
              distance: 150,
              opacity: 0.4,
              width: 1,
            },
          },

          interactivity: {
            detect_on: "window",
            events: {
              onhover: {
                enable: true,
              },
            },
          },
        }}
      />
    </div>
  );
};

export default ParticlesScreen;
