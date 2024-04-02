global.NodeFilter = {
    // only accept text nodes. The hexadecimal value is 0x00000004
    SHOW_TEXT: 0x00000004,
    FILTER_ACCEPT: 1,
  };
  const { JSDOM } = require('jsdom');
  const { start, stop, dyslexiaType, mirrorWord,switchLetters } = require('./app.js');
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
  
  describe('Extension testing', () => {
    let originalDocument;
  
    beforeAll(() => {
      // Setup a simulated DOM environment
      const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
      global.document = dom.window.document;
      originalDocument = global.document.documentElement.innerHTML;
    });
  
    afterAll(() => {
      // Clean up the simulated DOM environment
      delete global.document;
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    test('Test Phonological dyslexia', () => {
      const originalText = '<div id="test">Dyslexia is a learning disability that hinders an individual’s ability to read by affecting spelling, writing, and comprehension skills.</div>';
      document.body.innerHTML = originalText;
      dyslexiaType("Phonological");
      const textNode = document.querySelector('#test');
      expect(textNode.textContent).not.toBe(originalText);
    });
    test('Test Surface dyslexia', () => {
        const originalText = 'Dyslexia is a learning disability that hinders an individual’s ability to read by affecting spelling, writing, and comprehension skills.';
        document.body.innerHTML = originalText;
        dyslexiaType("Surface");
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
      dyslexiaType("Rapid naming");
      const modifiedTextNodes = document.querySelectorAll('span');
      modifiedTextNodes.forEach(node => {
          expect(node.style.color).toBeTruthy();
          expect(node.style.transform).toBeTruthy();
      });
    });
    test('Test Visual dyslexia',() => {
      const originalText = 'Dyslexia is a learning disability that hinders an individual’s ability to read by affecting spelling, writing, and comprehension skills.';
      document.body.innerHTML = originalText;
      dyslexiaType("Visual");
      const modifiedTextNodes = document.querySelectorAll('span');
      modifiedTextNodes.forEach(node => {
          expect(node.style.animation).toBeTruthy();
      });
      let input = "badpq";
      let  expected = "dabqp";
      const mirrored = mirrorWord(input); // Assuming this function exists and is accessible
      expect(mirrored).toBe(expected);
      input = "dyslexia";
      expected = "ayslexid";
      const rerrange = switchLetters(input);
      expect(rerrange).toBe(expected);

    })
  });
  