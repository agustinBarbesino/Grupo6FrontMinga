import React, { useEffect, useRef, useState } from "react";
import MioImage from './Resources/Mio.png';  
import KOnImage from './Resources/k-on2.gif'; 
import "./stylesShimeji.css";


const Shimeji = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [controlX, setControlX] = useState(1);
  const [controlY, setControlY] = useState(1);
  const [dragging, setDragging] = useState(false); 
  const [imagenActual, setImagenActual] = useState(KOnImage); 
  const velocidad = 0.3;
  const lienzoRef = useRef(null);
  const imagenRef = useRef(null);
  let intervalo = useRef(null);
  const handleMouseDown = () => {
    
    setDragging(true);
   
    
    setImagenActual(MioImage);
    
  };

  
  const handleMouseUp = (e) => {
    setImagenActual(KOnImage)
    setDragging(false);
    ; 
    const rect = lienzoRef.current.getBoundingClientRect();
    const newX = e.clientX - rect.left - 50; 
    const newY = e.clientY - rect.top - 50; 
    setX(newX);
    setY(newY);
 
    
  };

  const handleMouseMove = (e) => {
 
    if (dragging) {
      const rect = lienzoRef.current.getBoundingClientRect();
      const newX = e.clientX - rect.left - 50; 
      const newY = e.clientY - rect.top - 60; 
      setX(newX);
      setY(newY);
    }
  };


  const mover = () => {
    const lienzo = lienzoRef.current;
    const imagen = imagenRef.current;

  
    let newY = controlY ? y + velocidad : y - velocidad;
    if (newY <= 0) {
      setControlY(1);
      newY = 0;
    } else if (newY >= lienzo.offsetHeight - 100) {
      setControlY(0);
      newY = lienzo.offsetHeight - 100;
    }

   
    let newX = controlX ? x + velocidad : x - velocidad;
    if (newX <= 0) {
      setControlX(1);
      newX = 0;
      imagen.style.transform = "scaleX(-1)";
    } else if (newX >= lienzo.offsetWidth - 100) {
      setControlX(0);
      newX = lienzo.offsetWidth - 100;
      imagen.style.transform = "scaleX(1)";
    }

    setX(newX);
    setY(newY);
  };

  useEffect(() => {
    
    if(!dragging){
      intervalo.current = setInterval(mover, 6);
      return () => clearInterval(intervalo.current); 
    }
  
  }, [x, y, controlX, controlY, dragging]);





  return (
 
      <div id="lienzo" ref={lienzoRef} onMouseMove={handleMouseMove} >
        <img
          src={imagenActual}
          id="imagen"
          ref={imagenRef}
          alt="eclipse"
          draggable="false"
          style={{ left: `${x}px`, top: `${y}px` }}
          onMouseDown={handleMouseDown} 
          onMouseUp={handleMouseUp} 
        />
      </div>

  );
};



export default Shimeji;
