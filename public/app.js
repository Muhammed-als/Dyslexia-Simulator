//const chromeApi = require('./chromeApi');

let isListening = false;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type === "stop") {
        stop();
    }
    else{
        start();
    }
});

function start() {
    if (!isListening) {
        chrome.runtime.onMessage.addListener(messageListener);
        isListening = true;
    }
}

function stop() {
    if (isListening) {
       /*  chrome.runtime.onMessage.removeListener(messageListener); */
        isListening = false;
    }
}

function dyslexiaType(type) {
    switch(type) {
        case "Phonological":
            activatePhonological();
            break;
        case "Surface":
            changeBackgroundColor("red");
            break;
        case "Rapid naming":
            changeBackgroundColor("green");
            break;
        case "Visual":
            changeBackgroundColor("yellow");
            break;
        case "Double Deficit":
            changeBackgroundColor("brown");
            break;
        default:
            break;
    }
}

function activatePhonological(){
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


const messageListener = function(request, sender, sendResponse) {
    if (request.type) {
        dyslexiaType(request.type); 
    }
};

chrome.runtime.onMessage.addListener(messageListener);

module.exports = {
    start,
    stop,
    dyslexiaType
};
