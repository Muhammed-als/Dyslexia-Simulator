const chromeApi = require('./chromeApi');

let isListening = false;

chromeApi.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type === "stop") {
        stop();
    }
    else{
        start();
    }
});

function start() {
    if (!isListening) {
        chromeApi.runtime.onMessage.addListener(messageListener);
        isListening = true;
    }
}

function stop() {
    if (isListening) {
       /*  chromeApi.runtime.onMessage.removeListener(messageListener); */
        isListening = false;
    }
}

function dyslexiaType(type) {
    switch(type) {
        case "Phonological":
            activatePhonologicalMood();
            break;
        case "Surface":
            activateSurfaceMood();
            break;
        case "Rapid naming":
            actiavateRapidNamingMood();
            break;
        case "Visual":
            activateVisualMood();
            break;
        case "Double Deficit":
            changeBackgroundColor("brown");
            break;
        default:
            break;
    }
}

function activatePhonologicalMood(){
    var allText = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    var textNodes = [];
    while (allText.nextNode()) {
        textNodes.push(allText.currentNode);
    }
    for(let i = 0; i<parseInt(textNodes.length/2); i++){
        combineWords();
        createUnfamiliarWords();
    }
    function combineWords() {
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
                    words[i] = words[i] + ' ' + words[i + 1];
                    words.splice(i + 1, 1); // Remove the next word at index i + 1
                }
                
            }
            const newTextContent = words.join(' ');
            randomTextNode.nodeValue = newTextContent;
        }
    }

    
    function createUnfamiliarWords(){
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
}
function activateSurfaceMood(){
    var allText = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    var textNodes = [];
    while (allText.nextNode()) {
        textNodes.push(allText.currentNode);
    }
    for(let i = 0; i<parseInt(textNodes.length/2); i++){
        changeFontSettings();
        applyBlurEffect();
    }
    function changeFontSettings(){
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
                    { fontFamily: "Cursive" }, //  cursive font
                    { fontFamily: "Impact" }, //  decorative font
                    {fontFamily: "Comic Sans MS"},
                    {fontFamily: "Papyrus"},
                    {fontFamily: "Curlz MT"}
                ];
                const randomFontSetting = fontSettings[Math.floor(Math.random() * fontSettings.length)];
                words[i] = `<span style="font-family: ${randomFontSetting.fontFamily}">${word}</span>`;
            }
            const newTextContent = words.join(' ');
            randomTextNode.nodeValue = '';
            randomTextNode.parentElement.innerHTML += newTextContent;
        }
    }
    function applyBlurEffect() {
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
            randomTextNode.nodeValue = '';
            randomTextNode.parentElement.innerHTML += newTextContent;
        }
    }
    
}

function actiavateRapidNamingMood(){
    var allText = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    var textNodes = [];
    while (allText.nextNode()) {
        textNodes.push(allText.currentNode);
    }
    for(let i = 0; i<parseInt(textNodes.length/2); i++){
        changeAppearanceOfText();
        applyWarpEffect();
    }
    function changeAppearanceOfText(){
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
    function applyWarpEffect(){
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
}
function activateVisualMood(){
    var allText = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    var textNodes = [];
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes wordMovement {
            0% { transform: translateX(0); }
            100% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);
    while (allText.nextNode()) {
        textNodes.push(allText.currentNode);
    }
    for(let i = 0; i<parseInt(textNodes.length/2); i++){
        applyWordMovement();
    }
    function applyWordMovement(){
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
}
const messageListener = function(request, sender, sendResponse) {
    if (request.type) {
        dyslexiaType(request.type); 
    }
};
chromeApi.runtime.onMessage.addListener(messageListener);

module.exports = {
    start,
    stop,
    dyslexiaType
};
