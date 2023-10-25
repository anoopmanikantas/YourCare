import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import html2canvas from 'html2canvas'; // You'll need to install this package
import Strings from '../Strings';
import { useNavigate } from 'react-router-dom';

const SignaturePad = () => {
  const navigate = useNavigate();
  const sigCanvas = useRef({});
  const [penSize, setPenSize] = useState(5);
  const [imageURL, setImageURL] = useState(null);

  const clear = () => {
    sigCanvas.current.clear();
    setImageURL(null); // Clear the image when the canvas is cleared
  };

  const draw = () => {
    const ctx = sigCanvas.current.getCanvas().getContext('2d');
    ctx.lineWidth = penSize;
  };

  const upload = async () => {
    const canvas = await html2canvas(sigCanvas.current.getCanvas());
    const dataUrl = canvas.toDataURL();
    navigate(Strings.routeToRoot, { state: { image: dataUrl } });
  };

  const canvasStyle = {
    border: '2px solid black',
    borderRadius: '8px',
    width: 'calc(100% - 48px)', // Subtract padding from width
    height: 'calc(300vh - 48px)' // Set a large height to allow scrolling
  };

  const containerStyle = {
    width: '100%',
    height: '100vh',
    padding: '24px',
    overflowY: 'scroll',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  };

  const buttonStyle = {
    borderRadius: '8px',
    width: '180px',
    margin: '5px'
  };

  const imageStyle = {
    width: '150px',
    height: '150px'
  };

  return (
    <div style={containerStyle}>
      <div>
        <button style={buttonStyle} onClick={clear}>{Strings.clearString}</button>
        <button style={buttonStyle} onClick={upload}>{Strings.saveString}</button>
      </div>
      <SignatureCanvas 
        ref={sigCanvas}
        canvasProps={{style: canvasStyle, className: 'sigCanvas'}} 
        penColor='black'
        onBegin={draw}
      />
      {imageURL && <img src={imageURL} alt="Signature preview" style={imageStyle} />}
    </div>
  );
};

export default SignaturePad;
