import './App.css';
import Penciltool from './components/PencilTool';
import NavBar from './components/NavigationBar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PatientForm from './components/PatientDiagnosis';
import SpeechToText from './components/SpeechToText';
import Strings from './Strings';
import { useState } from 'react';

function App() {
  const patients = {
    name: ["joe", "Mason"],
    id: ["00001", "00002"]
  }
  const [patientData, setPatientData] = useState({
    name: Strings.emptyString,
    id: Strings.emptyString
  });
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<PatientForm patientData={patientData} setPatientData={setPatientData} patientsList={patients} />} />
        <Route path={Strings.routeToWritingScreenString} element={<Penciltool />} />
        <Route path={Strings.routeToSpeechToTextScreenString} element={<SpeechToText />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
