global.NodeFilter = {
    // only accept text nodes. The hexadecimal value is 0x00000004
    SHOW_TEXT: 0x00000004,
    FILTER_ACCEPT: 1,
  };
  const { JSDOM } = require('jsdom');
  const { start, stop, dyslexiaType } = require('./app.js');
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
  
    test('Test different types of dyslexia', () => {
      const originalText = '<div id="test">Dyslexia is a learning disability that hinders an individual’s ability to read by affecting spelling, writing, and comprehension skills. Dyslexia is not a learning disability that a child will outgrow, so it’s important to pursue a diagnosis and implement strategies to improve reading ability at a young age. Anyone can be diagnosed with dyslexia, although the dyslexia test process is different for adults than it is for children. Often, individuals with dyslexia can be very creative and intelligent yet struggle with basic reading skills.</div>';
      document.body.innerHTML = originalText;
      dyslexiaType("Phonological");
      const textNode = document.querySelector('#test');
      expect(textNode.textContent).not.toBe(originalText);
    });
  });
  