import React, { useState } from "react";
import { createRoot } from 'react-dom/client';
import Aids from "./components/aids/Aids.jsx";
import "./styles/app.css";
import Simulation from "./components/simulation.jsx";

function Popup() {
    const [aidsAreSelected, setAidsAreSelected] = useState(false);
    const sendMessageToContentScript = (type, difficultyLevels, settings) => {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                type: type,
                diffuculty: difficultyLevels,
                settings : settings
            });
        });
    };
    const handleToggleView = () => {
        setAidsAreSelected(prev => !prev);
    };

    return (
        <>
            {aidsAreSelected ? (
                <Aids onBack={handleToggleView} sendToContentScript={sendMessageToContentScript} />
            ) : (
                <Simulation onAidsSelected={handleToggleView} sendToContentScript={sendMessageToContentScript}  />
            )}
        </>
    );
}

createRoot(document.getElementById('react-target')).render(<Popup />);