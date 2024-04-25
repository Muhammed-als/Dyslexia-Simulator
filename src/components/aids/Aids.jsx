import React, { useState } from "react";
import backImage from "../../../public/images/back_btn.png"
import Speak from "./Speak.jsx";

function Aids({ onBack, sendToContentScript }){
    const [selectedAid, setSelectedAid] = useState("speak");
    const handleSelectedAid = (aid) => {
        setSelectedAid(aid);
    };
    return (
        <>
            <h1 className="title"><i>Aids</i></h1>
            <button className="back" onClick={onBack}>
                <img src={backImage} alt="back"/>
            </button>
            <div className="avaialbleAids">
            <button className={selectedAid === "speak" ? "selectedAid" : ""} onClick={() => handleSelectedAid("speak")}>Speak</button>
            <button className={selectedAid === "textSettings" ? "selectedAid" : ""} onClick={() => handleSelectedAid("textSettings")}>Text settings</button>
            </div>
            <div className="separateLine"></div>
            <>
            {selectedAid ? (
                <Speak sendToContentScript={sendToContentScript}/>
            ) : (
                <button>Text</button>
                // {/* <TextSettings /> */}
            )}
            </>
               

        </>
        
    );
}

export default Aids;