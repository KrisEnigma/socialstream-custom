(function() {
    'use strict';
    
    // Inject custom CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://krisenigma.github.io/socialstream-custom/kris.css';
    document.head.appendChild(link);
    
    const twitchImageUrl = 'https://krisenigma.github.io/socialstream-custom/twitchbg.png';
    const originalSrcDescriptor = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'src');
    
    // Replace Twitch icons on src property change
    Object.defineProperty(HTMLImageElement.prototype, 'src', {
        set: function(value) {
            if (value && value.includes('twitch.png')) {
                originalSrcDescriptor.set.call(this, twitchImageUrl);
            } else {
                originalSrcDescriptor.set.call(this, value);
            }
        },
        get: function() {
            return originalSrcDescriptor.get.call(this);
        }
    });
    
    // Replace existing Twitch icons
    function replaceTwitchIcons() {
        document.querySelectorAll('img[src*="twitch.png"]').forEach(img => {
            img.src = twitchImageUrl;
        });
    }
    
    // Watch for new Twitch icons
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === 1 && node.tagName === 'IMG' && node.src?.includes('twitch.png')) {
                    node.src = twitchImageUrl;
                }
                node.querySelectorAll?.('img[src*="twitch.png"]').forEach(img => {
                    img.src = twitchImageUrl;
                });
            });
        });
    });

    if (document.body) {
        observer.observe(document.body, { childList: true, subtree: true });
        replaceTwitchIcons();
    } else {
        document.addEventListener('DOMContentLoaded', () => {
            observer.observe(document.body, { childList: true, subtree: true });
            replaceTwitchIcons();
        });
    }
})();
