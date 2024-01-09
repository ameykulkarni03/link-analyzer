document.getElementById('analyzeButton').addEventListener('click', () => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "analyzeLinks" });
  });
});

chrome.runtime.onMessage.addListener((request) => {
  if (request.action === "displayLinks") {
    displayLinks(request.links);
  }
});

function displayLinks(links) {
  const resultsElement = document.getElementById('results');
  resultsElement.innerHTML = '';

  const linkCount = document.createElement('div');
  linkCount.textContent = `Total Links: ${links.length}`;
  resultsElement.appendChild(linkCount);

  const table = document.createElement('table');
  table.classList.add('linkTable');

  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  ['Link', 'Type'].forEach(text => {
    const th = document.createElement('th');
    th.textContent = text;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  links.forEach(link => {
    const row = document.createElement('tr');
    ['url', 'type'].forEach(key => {
      const td = document.createElement('td');
      td.textContent = link[key];
      row.appendChild(td);
    });
    tbody.appendChild(row);
  });
  table.appendChild(tbody);

  resultsElement.appendChild(table);
}
