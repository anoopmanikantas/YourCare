import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Strings from '../Strings';

const PatientForm = ({patientData, setPatientData, patientsList}) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  var dataFromPencilTool = "";
  if (dataFromPencilTool == "") { 
    dataFromPencilTool = location.state?.image;
  }
  
  const dataFromSpeechToText = location.state?.speech;

  const routeToWritingScreen = () => { 
    navigate(Strings.routeToWritingScreenString);
  }

  const routeToSpeechToTextScreen = () => { 
    navigate(Strings.routeToSpeechToTextScreenString);
  }
  const [patientName, setPatientName] = useState(Strings.emptyString);
  const [patientId, setPatientId] = useState(Strings.emptyString);

  const handlePatientNameChange = (event) => {
    setPatientName(event.target.value);
    const index = patientsList.name.indexOf(event.target.value);
    if (index !== -1) {
      setPatientId(patientsList.id[index]);
    }
  };

  const handlePatientIdChange = (event) => {
    setPatientId(event.target.value);
    const index = patientsList.id.indexOf(event.target.value);
    if (index !== -1) {
      setPatientName(patientsList.name[index]);
    }
  };


  return (
    <div style={{ padding: '16px', margin: '16px' }}>
      <form>
        <div style={{ display: 'flex', marginBottom: '10px' }}>
          <label style={{ width: '150px', marginRight: '10px' }}>{Strings.patientNameString}</label>
          <select value={patientName} onChange={handlePatientNameChange} style={{ flex: 1 }}>
            {patientsList.name.map((name, index) => (
              <option key={index} value={name}>{name}</option>
            ))}
          </select>
        </div>
        <div style={{ display: 'flex', marginBottom: '10px' }}>
          <label style={{ width: '150px', marginRight: '10px' }}>{Strings.patientIdString}</label>
          <select value={patientId} onChange={handlePatientIdChange} style={{ flex: 1 }}>
            {patientsList.id.map((id, index) => (
              <option key={index} value={id}>{id}</option>
            ))}
          </select>
        </div>
        <div style={{ display: 'flex', flex: 1, marginBottom: '10px' }}>
          <label style={{ width: '150px', marginRight: '10px' }}>{Strings.diagnosisString}</label>
          {dataFromPencilTool && <img src={dataFromPencilTool} style={{ height: '300px', width: '300px' }}></img>} <br></br>
          {dataFromSpeechToText && <p>{dataFromSpeechToText}</p>}
        </div>
      </form>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '4px' }}>
        <button style={{ padding: '4px' }} onClick={routeToWritingScreen}>{Strings.writeString}</button>
        <button style={{ padding: '4px' }} onClick={routeToSpeechToTextScreen}>{Strings.recordString}</button>
      </div>
    </div>
  );
};

export default PatientForm;
