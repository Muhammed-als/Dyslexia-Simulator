import React, {useState} from "react";
import speakImage from "../../../public/images/speaktext.png";

function Speak({sendToContentScript}){
    const [speakButton, setSpeakButton ] = useState("speak");
    const [pauseButton, setPauseButton ] = useState("pause");
    const [selectedLanguage, setSelectedLanguage] = useState("English");
    const [selectedSpeed, setSelectedSpeed] = useState(1);
    const handleSpeakButton = () => {
        sendToContentScript(speakButton,null,sendSettingsToContentScript());
        setSpeakButton((prevState) => (prevState === "speak" ? "dont_speak" : "speak"))
    }
    const handlePauseButton = () => {
        sendToContentScript(pauseButton,null,sendSettingsToContentScript());
        setPauseButton((prevState) => (prevState === "pause" ? "play" : "pause"))
    }
    const handleLanguageChange = (event) => {
        setSelectedLanguage(event.target.value);
    };

    const handleSpeedChange = (event) => {
        setSelectedSpeed(parseFloat(event.target.value));
    };
    const sendSettingsToContentScript = () => {
        const settings = {
            language: selectedLanguage,
            speed: selectedSpeed
        };
        return settings;
    };
    return (
        <div className="speakButtons">
            <div className="speakSettings">
                <div className="language">
                    <p>Select reading language</p>
                    <select value={selectedLanguage} onChange={handleLanguageChange}>
                        <option value="English">English</option>
                        <option value="Danish">Danish</option>
                    </select>
                </div>
                <div className="speed">
                    <p>Select reading speed</p>
                    <input type="range" min="0.1" max="2" step="0.1" value={selectedSpeed} onChange={handleSpeedChange} />
                    <p>{selectedSpeed}</p>
                </div>
            </div>
            <button type="button" className={speakButton} onClick={handleSpeakButton}>
                {speakButton === "speak" ? (
                    <div className="speakButton">
                        <img src={speakImage} alt="speak_img" />
                        <p>Speak</p>
                    </div>
                ) : (
                    <p>Stop speaking</p>
                )}
            </button>
            <button className={pauseButton} onClick={handlePauseButton}>
                {pauseButton === "pause" ? (
                    <p>Pause</p>
                ):
                (
                    <p>Play</p>
                )
                }
            </button>
            <br />
            <br />
            <h3 style={{ width: "100%", display: "flex", justifyContent : "center"}}>*Try to stop and play speaking again,if it is not working from first time</h3>
        </div>
    );
}

export default Speak;