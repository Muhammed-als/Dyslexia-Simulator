import React, { useState } from "react";
import { createRoot } from 'react-dom/client';
import "./styles/app.css";
import Phonological from "./components/phonological.jsx";
import Surface from "./components/surface.jsx";
import RapidNaming from "./components/rapidNaming.jsx";
import Visual from "./components/visual.jsx";
import DoubleDeficit from "./components/doubleDeficit.jsx";

function Popup () {
    const [selectedType, setSelectedType] = useState(null);
    const [difficultyLevels, setDifficultyLevels] = useState({
        "Phonological": 1,
        "Surface": 1,
        "Rapid_naming": 1,
        "Visual": 1,
        "Double_Deficit": 1
    });
    const [changeButton, setChangedButton] = useState("start");

    const sendMessageToContentScript = (type) => {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                type: type,
                diffuculty: difficultyLevels
            });
        });
    };

    const handleTypeChange = (event) => {
        const newType = event.target.value;
        setSelectedType(newType);
    };

    const handleDifficultyChanging = (event) => {
        const newDifficulty = event.target.value;
        // parse as an integer with base 10,
        setDifficultyLevels(prev => ({ ...prev, [selectedType]: parseInt(newDifficulty, 10) }));
    }

    const handleChangingButton = () => {
        if (changeButton === "start") {
            sendMessageToContentScript(selectedType);
        } else {
            sendMessageToContentScript("stop");
        }
        setChangedButton((prevState) => (prevState === "start" ? "stop" : "start"));
    };
    

    const getDescription = () => {
        switch (selectedType) {
            case "Phonological":
                return <Phonological />;
            case "Surface":
                return <Surface />;
            case "Rapid naming":
                return <RapidNaming />;
            case "Visual":
                return <Visual />;
            case "Double Deficit":
                return <DoubleDeficit />;
            default:
                return "";
        }
    };

    return (
        <div className="extension-container">
            <h1 className="title"><i>Dyslexia Simulator</i></h1>
            <h2><strong>Select a Dyslexia type</strong></h2>
            <div className="types">
                {["Phonological", "Surface", "Rapid naming", "Visual", "Double Deficit"].map((type) => (
                    <div className="type" key={type}>
                        <label>{type}</label>
                        {selectedType === type && (
                            <div className="difficutly">
                                <p className="minValue">1</p>
                                <input type="range" min="1" max="5" value={difficultyLevels[type]} onChange={handleDifficultyChanging} />
                                <p className="maxValue">5</p>
                            </div>
                        )}
                        <input type="radio" name="type" id={type} value={type} checked={selectedType === type} onChange={handleTypeChange} />
                    </div>
                ))}
            </div>
            <div className="separateLine"></div>
            <div className="description">
                {getDescription()}
            </div>
            <div className="buttons">
                <button type="button" className={changeButton} onClick={handleChangingButton}>
                    {changeButton === "start" ? "Start simulation" : "Stop simulation"}
                </button>
            </div>
        </div>
    );
}

createRoot(document.getElementById('react-target')).render(<Popup />);
