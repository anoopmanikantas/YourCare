import { useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Strings from './Strings';
import NavBar from './components/NavigationBar';
import PatientForm from './components/PatientDiagnosis';
import Penciltool from './components/PencilTool';
import SpeechToText from './components/SpeechToText';
 
function App() {
  const patients = {
    name: ["wow", "Mason"],
    id: ["00001", "00002"],
    symptoms: ["diabetes", "hypertension", "cancer", "Fever", "Rhinitis", "Migraine"]
  }
  const [patientData, setPatientData] = useState({
    name: Strings.emptyString,
    id: Strings.emptyString,
    symptoms: Strings.emptyString,
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