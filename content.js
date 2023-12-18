(function() {    
    function analyzeLinks() {
    const links = Array.from(document.getElementsByTagName('a'));
    const results = {
        total: links.length,
        internal: [],
        external: [],
        nofollow: []
    };

    const baseDomain = new URL(document.baseURI).hostname;

    links.forEach(link => {
        if (!link.href || link.href.trim() === '' || link.href.startsWith('javascript:')) {
            return;
        }
        
        const url = new URL(link.href);
        const isInternal = url.hostname === baseDomain;
        const isNofollow = link.rel.includes('nofollow');

        if (isInternal) results.internal.push(link.href);
        else results.external.push(link.href);
        
        if (isNofollow) results.nofollow.push(link.href);
    });

    return results;
    }

    const linkAnalysis = analyzeLinks();
    chrome.runtime.sendMessage(linkAnalysis);
    console.log("testing content.js")
})();