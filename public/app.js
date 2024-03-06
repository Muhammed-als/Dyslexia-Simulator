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
    console.log(type);
    switch(type) {
        case "Phonological":
            changeBackgroundColor("black");
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
            changeBackgroundColor("brow");
            break;
        default:
            break;
    }
}

function changeBackgroundColor(color) {
    document.body.style.backgroundColor = color;
}

const messageListener = function(request, sender, sendResponse) {
    if (request.type) {
        dyslexiaType(request.type); 
    }
};

chrome.runtime.onMessage.addListener(messageListener);
