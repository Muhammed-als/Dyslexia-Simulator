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
    const [changeButton, setChangedButton] = useState("start");

    const sendMessageToContentScript = (type) => {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {type: type});
        });
    };

    const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
    };

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
                <div>
                    <label>Phonological</label>
                    <input type="radio" name="phonological" id="phonological" value="Phonological" checked={selectedType === "Phonological"} onChange={handleTypeChange} />
                </div>
                <div>
                    <label>Surface</label>
                    <input type="radio" name="Surface" id="Surface" value="Surface" checked={selectedType === "Surface"} onChange={handleTypeChange} />
                </div>
                <div>
                    <label>Rapid naming</label>
                    <input type="radio" name="Rapid_naming" id="Rapid_naming" value="Rapid naming" checked={selectedType === "Rapid naming"} onChange={handleTypeChange} />
                </div>
                <div>
                    <label>Visual</label>
                    <input type="radio" name="Visual" id="Visual" value="Visual" checked={selectedType === "Visual"} onChange={handleTypeChange} />
                </div>
                <div>
                    <label>Double Deficit</label>
                    <input type="radio" name="Double_Deficit" id="Double_Deficit" value="Double Deficit" checked={selectedType === "Double Deficit"} onChange={handleTypeChange} />
                </div>
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
