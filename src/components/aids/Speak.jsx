import React, {useState} from "react";
import speakImage from "../../../public/images/speaktext.png";

function Speak({sendToContentScript}){
    const [speakButton, setSpeakButton ] = useState("speak");
    const [pauseButton, setPauseButton ] = useState("pause");
    const [selectedLanguage, setSelectedLanguage] = useState("English");
    const [selectedSpeed, setSelectedSpeed] = useState(1);
    const [selectedHighLightedColor, setSelectedHihgLightedColor] = useState("yellow");
    const [textAreaInput, setTextAreaInput] = useState("");
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
    const handleChangingHighlightedColor = (event) => {
        setSelectedHihgLightedColor(event.target.value.toLowerCase());
    }
    const handleTextAreaInput = (event) => {
        setTextAreaInput(event.target.value);
    }
    const sendSettingsToContentScript = () => {
        const settings = {
            language: selectedLanguage,
            speed: selectedSpeed,
            hihgLightedColor: selectedHighLightedColor,
            textAreaInput: textAreaInput
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
                <div className="highligt">
                    <p>Select highlighting color</p>
                    <input type="text" name="highLightedColor" placeholder="Type the desired color" id="highLightedColor" value={selectedHighLightedColor} onChange={handleChangingHighlightedColor}/>
                </div>
                <div className="textAreaInput">
                    <p>Type the desired text to be read. Keep it empty to read to the entire site</p>
                    <textarea name="text" id="message" cols="100%" rows="10%" placeholder="Type the desired text" onChange={handleTextAreaInput}>{textAreaInput}</textarea>
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
        </div>
    );
}

export default Speak;