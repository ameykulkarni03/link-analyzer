(function() {  
    chrome.runtime.onMessage.addListener((message) => {
      if (message.action === "analyzeLinks") {
        const linkAnalysis = analyzeLinks();
        chrome.runtime.sendMessage({ action: "displayLinks", links: linkAnalysis });
      }
    });

    function analyzeLinks() {
        const links = Array.from(document.getElementsByTagName('a'));
        const linkData = [];
        const baseDomain = new URL(document.baseURI).hostname;

        links.forEach(link => {
            if (!link.href || link.href.trim() === '' || link.href.startsWith('javascript:')) {
                return;
            }

            const url = new URL(link.href);
            const isInternal = url.hostname === baseDomain;
            const isNofollow = link.rel.includes('nofollow');
            let type = isNofollow ? 'nofollow' : (isInternal ? 'internal' : 'external');

            linkData.push({ url: link.href, type: type });
        });

        return linkData;
    }

    const linkAnalysis = analyzeLinks();
    chrome.runtime.sendMessage({ action: "displayLinks", links: linkAnalysis });
})();
