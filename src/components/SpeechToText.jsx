import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Strings from '../Strings';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SpeechToText = () => {
    const [speech, setSpeech] = useState(Strings.emptyString);
    const [oldText, setOldText] = useState(Strings.emptyString);
    const [hasStoppedListening, setHasStoppedListening] = useState(false);
    const navigate = useNavigate();
    const startListening = () => {
        SpeechRecognition.startListening({ continuous: true, language: 'en-CA' });
    } 

    const stopListening = () => { 
        SpeechRecognition.stopListening();
    }

    var {
    transcript,
    browserSupportsSpeechRecognition,
    resetTranscript,
    listening,
  } = useSpeechRecognition();
 
  const handleSpeechEdit = (event) => {
    setSpeech(event.target.value);
    resetTranscript();
  };
 
  useEffect(() => {
    if (transcript.toString() && listening) {
      setSpeech(oldText + transcript.toString());
      console.log('new text', oldText + transcript.toString());
    }
  }, [transcript.toString(), listening]);
 
  useEffect(() => {
    if (listening && !oldText) {
      console.log('save old text');
      setOldText(speech);
    }
    if (!listening) {
      console.log('reset old text');
      setOldText('');
    }
  }, [listening]);
    
    if (!browserSupportsSpeechRecognition) {
        return null
    }
    const styles = {
        container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1em',
        backgroundColor: '#f5f5f5'
        },
        mainContent: {
        width: '100%',
        minHeight: '200px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        padding: '1em',
        marginBottom: '1em',
        backgroundColor: '#fff'
        },
        buttonStyle: {
        display: 'flex',
        gap: '1em'
        },
        button: {
        padding: '0.5em 1em',
        border: 'none',
        borderRadius: '4px',
        backgroundColor: hasStoppedListening ? '#0056b3' : '#007BFF',
        color: '#fff',
        cursor: 'pointer'
        },
        submitButton: {
            padding: '0.5em 1em',
            border: 'none',
            borderRadius: '4px',
            backgroundColor: '#28a745',
            color: '#fff',
            cursor: 'pointer'
        }
    };

    const handleSubmit = () => { 
         navigate(Strings.routeToRoot, { state: { speech: speech } });
    }

    return (
        <>
            <div style={styles.container}>
                <div style={styles.mainContent}>
                    <textarea
                        value={speech}
                        onChange={handleSpeechEdit}
                        // onClick={stopListening}
                        style={{ 
            width: 'calc(100% - 32px)', // Subtract margins from width
            height: '500px',
            margin: '16px'
          }}
                    ></textarea>
                </div>
                
                <div style={styles.buttonStyle}>
                    <button style={styles.button} onClick={startListening} disabled={hasStoppedListening}>{Strings.startListeningString}</button>
                    <button style={styles.button} onClick={stopListening} disabled={hasStoppedListening}>{Strings.stopListeningString}</button>
                    <button style={styles.submitButton} onClick={handleSubmit}>{Strings.submitString}</button>
                </div>
            </div>
        </>
    );
};

 

export default SpeechToText;