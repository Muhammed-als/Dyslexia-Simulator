import React, { useState } from "react";
import Phonological from "./Phonological.jsx";
import Surface from "./Surface.jsx";
import RapidNaming from "./RapidNaming.jsx";
import Visual from "./Visual.jsx";
import DoubleDeficit from "./DoubleDeficit.jsx";

function Simulation({ onAidsSelected,sendToContentScript  }) {
    const [selectedType, setSelectedType] = useState(null);
    const [difficultyLevels, setDifficultyLevels] = useState({
        "Phonological": 1,
        "Surface": 1,
        "Rapid_naming": 1,
        "Visual": 1,
        "Double_Deficit": 1
    });
    const [changeButton, setChangedButton] = useState("start");
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
            sendToContentScript(selectedType, difficultyLevels);
        } else {
            sendToContentScript("stop",null);
        }
        setChangedButton((prevState) => (prevState === "start" ? "stop" : "start"));
    };
    const getDescription = () => {
        switch (selectedType) {
            case "Phonological":
                return <Phonological />;
            case "Surface":
                return <Surface />
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
        <div className="simulation-container">
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
                <button style={selectedType ? {} : { cursor: "not-allowed" }} type="button" className={changeButton}     onClick={selectedType ? handleChangingButton : null}>
                        {changeButton === "start" ? "Start simulation" : "Stop simulation"}
                </button>
                {changeButton === "start" ? (
                    <button type="button" className="aids" onClick={onAidsSelected}>Aids</button>
                    ) : (
                        null
                    )}
            </div>
        </div>
    );
    
}
export default Simulation;