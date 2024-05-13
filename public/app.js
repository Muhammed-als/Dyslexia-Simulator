let isListening = false;
const messageListener = function(request, sender, sendResponse) {
    return request.type;
};
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if(request.type === "speak"){
        speakText(request.settings.language, request.settings.speed, request.settings.hihgLightedColor,request.settings.textAreaInput);
        
    }
    else if(request.type === "dont_speak"){
        stopSpeaking();
    }
    else if(request.type === "pause"){
        pauseSpeaking(request.settings.textAreaInput);
    }
    else if(request.type === "play"){
        continueSpeaking(request.settings.language, request.settings.speed, request.settings.hihgLightedColor,request.settings.textAreaInput);
    }
    if(request.type === "applyChanges"){
        applyChangesInText(request.settings.color,request.settings.size, request.settings.fontType, request.settings.lineSpace);
    }
    else if(request.type === "cancelChanges"){
        removeChangesInText();
    }
    if (request.type === "stop") {
        stop();
    }
    else{
        start();
        dyslexiaType(request.type,request.diffuculty); 
    }
});

function dyslexiaType(type,diffuculty) {
    switch(type) {
        case "Phonological":
            activatePhonologicalMood(diffuculty.Phonological);
            break;
        case "Surface":
            activateSurfaceMood(diffuculty.Surface);
            break;
        case "Rapid naming":
            actiavateRapidNamingMood(diffuculty.Rapid_naming);
            break;
        case "Visual":
            activateVisualMood(diffuculty.Visual);
            break;
        case "Double Deficit":
            activateDoubleDeficitMood(diffuculty.Double_Deficit);
            break;
        default:
            break;
    }
}
function start() {
    if (!isListening) {
        chrome.runtime.onMessage.addListener(messageListener);
        isListening = true;
    }
}

function stop() {
    if (isListening) {
        chrome.runtime.onMessage.removeListener(messageListener);
        isListening = false;
        var originalTexts = JSON.parse(localStorage.getItem('originalTexts'));
        if (originalTexts) {
            document.body.innerHTML = originalTexts.bodyContent;
            localStorage.removeItem('originalTexts');
            console.log("Page content restored from local storage.");
        } else {
            console.log("No stored content found.");
        }
    }
}

function collectTextNodes() {
    var allText = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    var textNodes = [];
    while (allText.nextNode()) {
        var currentNode = allText.currentNode;
        if (!isTextScriptOrStyle(currentNode)) {
            currentNode.originalText = currentNode.nodeValue; 
            textNodes.push(currentNode);
        }
    }
    var originalTexts = JSON.parse(localStorage.getItem('originalTexts'));
    if (!originalTexts) {
        originalTexts = {};
    }
    originalTexts.bodyContent = document.body.innerHTML;
    localStorage.setItem('originalTexts', JSON.stringify(originalTexts));
    return textNodes;
}

function isTextScriptOrStyle(node) {
    var parent = node.parentNode;
    while (parent) {
        if (parent.tagName === 'SCRIPT' || parent.tagName === 'STYLE') {
            return true;
        }
        parent = parent.parentNode;
    }
    return false;
}





function activatePhonologicalMood(difficulty){
    var textNodes = [];
    textNodes = collectTextNodes();
    const numModifications = Math.ceil(textNodes.length * (difficulty / 10)); 
    const combineWords = () => {
        const randomIndex = Math.floor(Math.random() * textNodes.length);
        const randomTextNode = textNodes[randomIndex];
        const textContent = randomTextNode.nodeValue.trim();
        let words = [];
        if (/\s+/.test(textContent)) {
            words = textContent.split(/\s+/);
        }
        const start = Math.max(0, Math.floor(Math.random() * (words.length - 1)));
        let end = Math.floor(Math.random() * (words.length - start - 1)) + start + 1;
        if(words.length > 0){
            for (let i = start; i < end; i++) {
                if(words[i + 1]){
                    words[i] = words[i] + '' + words[i + 1];
                    words.splice(i + 1, 1); // Remove the next word at index i + 1
                }
                
            }
            const newTextContent = words.join(' ');
            randomTextNode.nodeValue = newTextContent;
        }
    }
    const createUnfamiliarWords = () => {
        const randomIndex = Math.floor(Math.random() * textNodes.length);
        const randomTextNode = textNodes[randomIndex];
        const textContent = randomTextNode.nodeValue.trim();
        let words= [];
        if (/\s+/.test(textContent)) {
            words = textContent.split(/\s+/);
        }
        const start = Math.max(0, Math.floor(Math.random() * (words.length - 1)));
        let end = Math.floor(Math.random() * (words.length - start - 1)) + start + 1;
        if(words.length > 0){  
            for (let i = start; i < end; i++) {
                const word = words[i];
                if (word.length > 6) { 
                    const shortenedLength = Math.ceil(word.length * 3 / 4);
                    
                    // Create the shortcut by taking the first 3/4 of the word
                    const shortenedWord = word.substring(0, shortenedLength);    
                    words[i] = shortenedWord;
                }
            }    
            const newTextContent = words.join(' ');    
            randomTextNode.nodeValue = newTextContent;
        }
        
    }
    const addPhonologicalListeners = () => {
        console.log(true)
        for (let i = 0; i < numModifications; i++) {
            combineWords();
            createUnfamiliarWords();
        }
    };
    return addPhonologicalListeners();
}
function activateSurfaceMood(difficulty){
    var textNodes = [];
    textNodes = collectTextNodes();
    const numModifications = Math.ceil(textNodes.length * (difficulty / 10)); 
    const  changeFontStyle = () => {
        const randomIndex = Math.floor(Math.random() * textNodes.length);
        const randomTextNode = textNodes[randomIndex];
        const textContent = randomTextNode.nodeValue.trim();
        let words = [];
        if (/\s+/.test(textNodes)) {
            words = textContent.split(/\s+/);
        }
        const start = Math.max(0, Math.floor(Math.random() * (words.length - 1)));
        let end = Math.floor(Math.random() * (words.length - start - 1)) + start + 1;
        if(words.length > 0){
            for (let i = start; i < end; i++) {
                const word = words[i];
                const fontSettings = [
                    { fontFamily: "Cursive" },
                    { fontFamily: "Impact" },
                    {fontFamily: "Comic Sans MS"},
                    {fontFamily: "Papyrus"},
                    {fontFamily: "Curlz MT"}
                ];
                const randomFontSetting = fontSettings[Math.floor(Math.random() * fontSettings.length)];
                words[i] = `<span style="font-family: ${randomFontSetting.fontFamily}">${word}</span>`;
            }
            const newTextContent = words.join(' ');
            if (randomTextNode.parentElement) {
                let newDiv = document.createElement('span');
                newDiv.style.display = "inline-block";
                newDiv.innerHTML = newTextContent;
                randomTextNode.parentNode.replaceChild(newDiv, randomTextNode);
            }
        }
    }
    const applyBlurEffect = () => {
        const randomIndex = Math.floor(Math.random() * textNodes.length);
        const randomTextNode = textNodes[randomIndex];
        const textContent = randomTextNode.nodeValue.trim();
        let words = [];
        if (/\s+/.test(textContent)) {
            words = textContent.split(/\s+/);
        }
        let start = Math.max(0, Math.floor(Math.random() * (words.length - 1)));
        let end = Math.floor(Math.random() * (words.length - start - 1)) + start + 1;
        if (words.length > 0) {
            for (let i = start; i < end; i++) {
                const word = words[i];
                let newWord = '';
                for (let j = 0; j < word.length; j++) {
                    const letter = word[j];
                    let blurEffect = '';
                    blurEffect = 'filter: blur(1px);';
                    newWord += `<span style="${blurEffect}">${letter}</span>`;
                }
                words[i] = newWord;
            }
            const newTextContent = words.join(' ');
            if (randomTextNode.parentElement) {
                let newDiv = document.createElement('span');
                newDiv.style.display = "inline-block";
                newDiv.innerHTML = newTextContent;
                randomTextNode.parentNode.replaceChild(newDiv, randomTextNode);
            }
        }
    }
    const addSurfaceListeners = () => {
        for(let i = 0; i<numModifications; i++){
            changeFontStyle();
            applyBlurEffect();
        }
    }
    return addSurfaceListeners();
    
}

function actiavateRapidNamingMood(difficulty){
    var textNodes = [];
    textNodes = collectTextNodes();
    const numModifications = Math.ceil(textNodes.length * (difficulty / 10)); 
    const changeFontColor = () => {
        const randomIndex = Math.floor(Math.random() * textNodes.length);
        const randomTextNode = textNodes[randomIndex];
        const textContent = randomTextNode.nodeValue.trim();
        let words = [];
        if (/\s+/.test(textNodes)) {
            words = textContent.split(/\s+/);
        }
        const start = Math.max(0, Math.floor(Math.random() * (words.length - 1)));
        let end = Math.floor(Math.random() * (words.length - start - 1)) + start + 1;
        if(words.length > 0){
            for (let i = start; i < end; i++) {
                const word = words[i];
                const colors = [
                    "red",
                    "green",
                    "blue",
                    "brown",
                    "black",
                    "yellow",
                    "gray",
                    "purple",
                    "orange"
                ];
                const wordToLowerCase = words[i].toLowerCase();
                if(colors.includes(wordToLowerCase)){
                    let newColors = colors.filter(color => color !== wordToLowerCase);
                    let randomColor = newColors[Math.floor(Math.random() * newColors.length)];
                    words[i] = `<span style="color: ${randomColor}">${word}</span>`;
                }
                else{
                    let randomColor = colors[Math.floor(Math.random() * colors.length)];
                    words[i] = `<span style="color: ${randomColor}">${word}</span>`;
                }
            }
            const newTextContent = words.join(' ');
            if (randomTextNode.parentElement) {
                let newDiv = document.createElement('span');
                newDiv.style.display = "inline-block";
                newDiv.innerHTML = newTextContent;
                randomTextNode.parentNode.replaceChild(newDiv, randomTextNode);
            }
        }
    }
    const applyWarpEffect = () => {
        const randomIndex = Math.floor(Math.random() * textNodes.length);
        const randomTextNode = textNodes[randomIndex];
        const textContent = randomTextNode.nodeValue.trim();
        let words = [];
        if (/\s+/.test(textNodes)) {
            words = textContent.split(/\s+/);
        }
        const start = Math.max(0, Math.floor(Math.random() * (words.length - 1)));
        let end = Math.floor(Math.random() * (words.length - start - 1)) + start + 1;
        if(words.length > 0){
            for (let i = start; i < end; i++) {
                let startRotating = -10;
                let newWord = '';
                for (let j = 0; j < words[i].length; j++) {
                    newWord += `<span style="display: inline-block; transform: rotate(${startRotating}deg);">${words[i][j]}</span>`;
                    startRotating += 5;
                }
                words[i] = newWord;
            }
            const newTextContent = words.join(' ');
            if (randomTextNode.parentElement) {
                let newDiv = document.createElement('span');
                newDiv.style.display = "inline-block";
                newDiv.style.transformOrigin = "bottom center";
                newDiv.style.transition = "transform 0.3s";
                newDiv.innerHTML = newTextContent;
                randomTextNode.parentNode.replaceChild(newDiv, randomTextNode);
            }
        }

    }
    const addRapidNamingListeners = () => {
        for(let i = 0; i<numModifications; i++){
            changeFontColor();
            applyWarpEffect();
        }
    }
    return addRapidNamingListeners();
}
function activateVisualMood(difficulty){
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes wordMovement {
            0% { transform: translateX(0); }
            100% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);
    var textNodes = [];
    textNodes = collectTextNodes();
    const numModifications = Math.ceil(textNodes.length * (difficulty / 10)); 
    const applyWordMovement = () => {
        const randomIndex = Math.floor(Math.random() * textNodes.length);
        const randomTextNode = textNodes[randomIndex];
        const textContent = randomTextNode.nodeValue.trim();
        let words = textContent.split(/\s+/);
        const start = Math.max(0, Math.floor(Math.random() * (words.length - 1)));
        let end = Math.floor(Math.random() * (words.length - start)) + start;
    
        for (let i = 0; i < words.length; i++) {
            if (i >= start && i <= end) {
                words[i] = `<span style="position:relative; display:inline-block; animation: wordMovement 2s infinite alternate;">${words[i]}</span>`;
            } else {
                words[i] = `<span>${words[i]}</span>`; 
            }
        }
    
        const newTextContent = words.join(' ');
        if (randomTextNode.parentElement) {
            let newDiv = document.createElement('span');
            newDiv.style.display = "inline-block";
            newDiv.innerHTML = newTextContent;
            randomTextNode.parentNode.replaceChild(newDiv, randomTextNode);
        }
    }
    const displayTheMirrorOfLetter = () => {
        const randomIndex = Math.floor(Math.random() * textNodes.length);
        const randomTextNode = textNodes[randomIndex];
        const textContent = randomTextNode.nodeValue.trim();
        let words = [];
        if (/\s+/.test(textNodes)) {
            words = textContent.split(/\s+/);
        }
        const start = Math.max(0, Math.floor(Math.random() * (words.length - 1)));
        let end = Math.floor(Math.random() * (words.length - start - 1)) + start + 1;
        if(words.length > 0){
            words = words.map(word => mirrorWord(word));
            const newTextContent = words.join(' ');
            if (randomTextNode.parentElement) {
                let newDiv = document.createElement('span');
                newDiv.style.display = "inline-block";
                newDiv.style.transformOrigin = "bottom center";
                newDiv.style.transition = "transform 0.3s";
                newDiv.textContent = newTextContent;
                randomTextNode.parentNode.replaceChild(newDiv, randomTextNode);
            }
        }
    }
    const rearrangeLetters = () => {
        const randomIndex = Math.floor(Math.random() * textNodes.length);
        const randomTextNode = textNodes[randomIndex];
        const textContent = randomTextNode.nodeValue.trim();
        let words = [];
        if (/\s+/.test(textNodes)) {
            words = textContent.split(/\s+/);
        }
        const start = Math.max(0, Math.floor(Math.random() * (words.length - 1)));
        let end = Math.floor(Math.random() * (words.length - start - 1)) + start + 1;
        if(words.length > 0){
            words = words.map(word => switchLetters(word));
            const newTextContent = words.join(' ');
            if (randomTextNode.parentElement) {
                let newDiv = document.createElement('span');
                newDiv.style.display = "inline-block";
                newDiv.style.transformOrigin = "bottom center";
                newDiv.style.transition = "transform 0.3s";
                newDiv.textContent = newTextContent;
                randomTextNode.parentNode.replaceChild(newDiv, randomTextNode);
            }
        }
    }
    const addVisualListeners = () => {
        for(let i = 0; i<numModifications; i++){
            applyWordMovement();
            displayTheMirrorOfLetter();
            rearrangeLetters();
        }
    }
    return addVisualListeners();
}
function activateDoubleDeficitMood(difficulty){
    const addDoubleDeficitListeners = () => {
        activatePhonologicalMood(difficulty);
        actiavateRapidNamingMood(difficulty);
    }
    return addDoubleDeficitListeners();
}
function mirrorWord(word){
    const mirrorLetters = {
        "b" : "d",
        "d" : "b",
        "q" : "p",
        "p" : "q"
    };
    return word.split('').map(letter => mirrorLetters[letter] || letter).join('');
}
function switchLetters(word){
    if (word.length < 2) {
        return word;
    }
    let letters = word.split('');
    let firstLetter = letters[0];
    let lastLetter = letters[letters.length - 1];
    letters[0] = lastLetter;
    letters[letters.length - 1] = firstLetter;
    return letters.join(''); 
}
let currentUtterance;
let textNodes = [];
let currentIndex = 0; 
let highLightedNode;
function speakText(language, speed, hihgLightedColor, textAreaInput) {
    if(textAreaInput.trim().length > 0){
        speakTextAreaInput(language, speed, textAreaInput);
    }
    else{
        currentIndex = 0; 
        textNodes = collectTextNodes();
        speakNextNode(language, speed, hihgLightedColor,textAreaInput);
    }
    
}
function speakTextAreaInput(language, speed,textAreaInput){
    const utterance = new SpeechSynthesisUtterance();
    utterance.lang = language === "English" ? "en-US" : "da-DK";
    utterance.rate = speed;
    utterance.text = textAreaInput;
    currentUtterance = utterance;
    speechSynthesis.speak(utterance);
}
function speakNextNode(language, speed, hihgLightedColor) {
    if (currentIndex < textNodes.length) {
        const textNode = textNodes[currentIndex];
        const textContent = textNode.nodeValue.trim();
        if (/\s+/.test(textContent)) {
            const utterance = new SpeechSynthesisUtterance();
            utterance.lang = language === "English" ? "en-US" : "da-DK";
            utterance.rate = speed;
            utterance.text = textContent;
            utterance.onerror = function(event) {
                console.error("Speech synthesis error:", event.error);
            };
            utterance.onstart = function() {
                highlightWord(textNode,hihgLightedColor);
            };
            speechSynthesis.speak(utterance);
            currentUtterance = utterance;
            utterance.onend = function() {
                // remove the highlighed after done with speaking
                highLightedNode.parentNode.replaceChild(textNode, highLightedNode);
                currentIndex++;
                speakNextNode(language, speed, hihgLightedColor);
            };
            
        } else {
            currentIndex++;
            speakNextNode(language, speed,hihgLightedColor);
        }
    }
}
function highlightWord(textNode,hihgLightedColor) {
    const words = textNode.nodeValue.trim().split(/\s+/);
    for(let i = 0; i<words.length; i++){
        words[i]  = `<span style="background-color: ${hihgLightedColor}">${words[i]}</span>`
    }
    const container = document.createElement('span');
    container.innerHTML = words.join(' ');
    textNode.parentNode.replaceChild(container,textNode);
    highLightedNode = container;
}
function continueSpeaking(language, speed, hihgLightedColor, textAreaInput) {
    if(textAreaInput.trim().length > 0 && currentUtterance){
        currentUtterance.lang = "English" ? "en-US" : "da-DK";
        currentUtterance.rate = speed;
        currentUtterance.text = textAreaInput;
        speechSynthesis.resume();
    }
    else{
        speakNextNode(language, speed, hihgLightedColor);
    }
}
function stopSpeaking(){
    speechSynthesis.cancel();
    // This is important to remove the highlighted text
    var originalTexts = JSON.parse(localStorage.getItem('originalTexts'));
    if (originalTexts) {
        document.body.innerHTML = originalTexts.bodyContent;
        localStorage.removeItem('originalTexts');
    }
    currentUtterance = null;

}
function pauseSpeaking(textAreaInput){
    if(textAreaInput.trim().length > 0){
        speechSynthesis.pause();
    }
    // If it is not the textarea should read, then cancel the speech to be able to continue speaking, otherwise it will not continue speaking and highlight will not work.
    else{
        speechSynthesis.cancel();
    }
}
speechSynthesis.onresume = () => {
    if (currentUtterance) {
        continueSpeaking(currentUtterance.lang, currentUtterance.rate);
    }
};
function applyChangesInText(color, size, fontType, lineSpace){
    textNodes = collectTextNodes();
    textNodes.map(textNode => {
        const words = textNode.nodeValue.trim().split(/\s+/);
        for(let i = 0; i<words.length; i++){
            words[i]  = `<span style="color: ${color};font-size:${size}px;font-family:${fontType}; line-height:${lineSpace};">${words[i]}</span>`
        }
        const container = document.createElement('span');
        container.innerHTML = words.join(' ');
        textNode.parentNode.replaceChild(container,textNode);
    })   
}

function removeChangesInText(){
    var originalTexts = JSON.parse(localStorage.getItem('originalTexts'));
    if (originalTexts) {
        document.body.innerHTML = originalTexts.bodyContent;
        localStorage.removeItem('originalTexts');
    }
}
/* module.exports = {
    start,
    stop,
    dyslexiaType,
    mirrorWord,
    switchLetters

}; */