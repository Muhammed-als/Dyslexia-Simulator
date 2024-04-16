global.NodeFilter = {
    // only accept text nodes. The hexadecimal value is 0x00000004
    SHOW_TEXT: 0x00000004,
    FILTER_ACCEPT: 1,
  };
  const { JSDOM } = require('jsdom');
  const { dyslexiaType } = require('./app.js');
  const chromeApi = require('./chromeApi.js');
  
  jest.mock('./chromeApi.js', () => ({
    runtime: {
      onMessage: {
        addListener: jest.fn(),
        removeListener: jest.fn(),
      },
      sendMessage: jest.fn(),
    },
  }));
  // Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: function(key) {
      return store[key] || null;
    },
    setItem: function(key, value) {
      store[key] = value.toString();
    },
    clear: function() {
      store = {};
    },
    removeItem: function(key) {
      delete store[key];
    }
  };
})();

Object.defineProperty(global, 'localStorage', { value: localStorageMock });

describe('Extension testing', () => {
  let originalDocument;
  let difficulties = {}; 

  beforeAll(() => {
    const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
    global.document = dom.window.document;
    originalDocument = global.document.documentElement.innerHTML;
    difficulties = {
      "Phonological": 1,
      "Surface": 1,
      "Rapid_naming": 1,
      "Visual": 1,
      "Double_Deficit": 1
    }
  });

  afterAll(() => {
    delete global.document;
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorageMock.clear();
  });
  
    test('Test Phonological dyslexia', () => {
      const originalText = '<div id="test">Dyslexia is a learning disability that hinders an individual’s ability to read by affecting spelling, writing, and comprehension skills.</div>';
      document.body.innerHTML = originalText;
      dyslexiaType("Phonological",{Phonological: 1});
      const textNode = document.querySelector('#test');
      expect(textNode.textContent).not.toBe(originalText);
    });
    test('Test Surface dyslexia', () => {
        const originalText = 'Dyslexia is a learning disability that hinders an individual’s ability to read by affecting spelling, writing, and comprehension skills.';
        document.body.innerHTML = originalText;
        dyslexiaType("Surface",{Surface: 1});
        const modifiedTextNodes = document.querySelectorAll('span');
        
        // The modified words will have a span tag with font-family css key-value, therefore it is expected for the modified text to have fontFamily
        modifiedTextNodes.forEach(node => {
            expect(node.style.fontFamily).toBeTruthy();
            expect(node.style.opacity).toBeTruthy();
            expect(node.style.filter).toContain('blur');
        });
    });
    test('Test Rapid naming dyslexia', () => {
      const originalText = 'Dyslexia is a learning disability that hinders an individual’s ability to read by affecting spelling, writing, and comprehension skills.';
      document.body.innerHTML = originalText;
      dyslexiaType("Rapid naming",{Rapid_naming: 1});
      const modifiedTextNodes = document.querySelectorAll('span');
      modifiedTextNodes.forEach(node => {
          expect(node.style.color).toBeTruthy();
          expect(node.style.transform).toBeTruthy();
      });
    });
    test('Test Visual dyslexia',() => {
      const originalText = 'Dyslexia is a learning disability that hinders an individual’s ability to read by affecting spelling, writing, and comprehension skills.';
      document.body.innerHTML = originalText;
      dyslexiaType("Visual",{Visual: 1});
      const modifiedTextNodes = document.querySelectorAll('span');
      modifiedTextNodes.forEach(node => {
          expect(node.style.animation).toBeTruthy();
      });

    })
    test('Test difficulty',() => {
      const list = ['a','b','c','d','e','f','g'];
      const difficulty = 3;
      const numModifications = Math.ceil(list.length * (difficulty / 10));
      expect(numModifications).toBe(3); // It is 3 modifications based on calculations

    })
  });
  