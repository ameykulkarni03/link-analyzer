document.getElementById('analyzeButton').addEventListener('click', () => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.scripting.executeScript({
      target: {tabId: tabs[0].id},
      files: ['content.js']
    });
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const resultsElement = document.getElementById('results');
  resultsElement.innerHTML = `<pre>${JSON.stringify(request, null, 2)}</pre>`;
});
  