import React, {useState} from "react";
function TextSettings({sendToContentScript}){
    const [selectedTextColor, setSelectedTextColor] = useState("");
    const [selectedFontType, setSelectedFontType] = useState("");
    const [selectedFontSize, setSelectedFontSize] = useState(0);
    const [spaceBetweenLines, setSelectLineSpace] = useState(1);
    const [applyButton, setButtonStatus] = useState("applyChanges");
    const handleTextColor = (event) => {
        setSelectedTextColor(event.target.value.toLowerCase());
    }
    const handleFontSize = (event) => {
        setSelectedFontSize(parseFloat(event.target.value));
    }
    const handleFontType = (event) => {
        setSelectedFontType(event.target.value);
    }
    const handleLinesapce = (event) => {
        setSelectLineSpace(parseInt(event.target.value));
    }
    const handleButtonStatus = () => {
        sendToContentScript(applyButton,null,sendSettingsToContentScript());
        setButtonStatus((prevState) => (prevState === "applyChanges" ? "cancelChanges" : "applyChanges"))
    }
    const sendSettingsToContentScript = () => {
        const settings = {
            color: selectedTextColor,
            size: selectedFontSize,
            fontType: selectedFontType,
            lineSpace: spaceBetweenLines
        };
        return settings;
    };
    const appliedStyles = {
        color: selectedTextColor, 
        fontFamily: selectedFontType, 
        fontSize: selectedFontSize > 0 ? `${selectedFontSize}px` : undefined, 
        lineHeight: spaceBetweenLines,
    };
    

    return(
        <>
            <div className="textSettingsContainer">
                <div className="textSettings">
                    <div className="selectedTextColor">
                        <p>Type the desired text color</p>
                        <input type="text" name="textColor" id="textColor" placeholder="Insert text color" value={selectedTextColor} onChange={handleTextColor} />
                    </div>
                    <div className="selectedTextFont">
                        <p>Type the desired font size</p>
                        <input type="number" name="fontSize" id="fontSize" placeholder="font size" value={selectedFontSize} onChange={handleFontSize} />
                    </div>
                    <div className="selectedFontType">
                        <p>Type the desired font type</p>
                        <select value={selectedFontType} onChange={handleFontType}>
                            <option value="">Select a font</option>
                            <option value="'Arial', sans-serif">Arial</option>
                            <option value="'Times New Roman', serif">Times New Roman</option>
                            <option value="'Courier New', monospace">Courier New</option>
                            <option value="'Georgia', serif">Georgia</option>
                            <option value="'Comic Sans MS', cursive, sans-serif">Comic Sans MS</option>
                            <option value="'Trebuchet MS', sans-serif">Trebuchet MS</option>
                            <option value="'Lucida Console', monospace">Lucida Console</option>
                            <option value="'Verdana', sans-serif">Verdana</option>
                            <option value="'Tahoma', sans-serif">Tahoma</option>
                            <option value="'Helvetica Neue', sans-serif">Helvetica Neue</option>
                            <option value="'Brush Script MT', Brush Script Std, cursive">Brush Script MT, Brush Script Std, cursive</option>
                            <option value="'Jazz LET', fantasy">Jazz LET, fantasy</option>
                        </select>
                    </div>
                    <div className="spaceBetweenLines">
                        <p>Space between lines</p>
                        <input type="number" name="spaceBetweenLines" id="spaceBetweenLines" value={spaceBetweenLines} placeholder="line spacing" onChange={handleLinesapce} />
                    </div>
                    <div className="previewText">
                    <span style={appliedStyles}>
                        This is to show how the different settings will look.<br />
                        This is to show how the different settings will look.
                    </span>
                    </div>
                </div>
                <div className="applyButton">
                    <button className={applyButton} onClick={handleButtonStatus}>
                        {applyButton=="applyChanges"?(
                            <p>Add changes</p>
                            ):
                            (
                                <p>Cancel changes</p>
                            )
                        }  
                    </button>
                </div>
            </div>
            
        </>
    );

}
export default TextSettings;