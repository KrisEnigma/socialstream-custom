(function() {
    'use strict';
    
    console.log('[KRIS] Script loaded successfully');
    
    // Inject custom CSS from GitHub Pages
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://krisenigma.github.io/socialstream-custom/kris.css';
    document.head.appendChild(link);
    console.log('[KRIS] CSS injected');
    
    const originalSrcDescriptor = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'src');
    
    Object.defineProperty(HTMLImageElement.prototype, 'src', {
        set: function(value) {
            if (value && value.includes('socialstream.ninja/sources/images/twitch.png')) {
                console.log('[KRIS] Replacing Twitch icon:', value);
                // Replace with GitHub Pages-hosted image
                originalSrcDescriptor.set.call(this, 'https://krisenigma.github.io/socialstream-custom/twitchbg.png');
            } else {
                originalSrcDescriptor.set.call(this, value);
            }
        },
        get: function() {
            return originalSrcDescriptor.get.call(this);
        }
    });
    
    function replaceTwitchIcons() {
        const icons = document.querySelectorAll('img[src*="socialstream.ninja/sources/images/twitch.png"]');
        console.log('[KRIS] Found', icons.length, 'Twitch icons to replace');
        icons.forEach(img => {
            img.src = 'https://krisenigma.github.io/socialstream-custom/twitchbg.png';
        });
    }
    
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            mutation.addedNodes.forEach(function(node) {
                if (node.nodeType === 1) { // Element node
                    if (node.tagName === 'IMG' && node.src && node.src.includes('socialstream.ninja/sources/images/twitch.png')) {
                        console.log('[KRIS] Replacing Twitch icon in new node');
                        node.src = 'https://krisenigma.github.io/socialstream-custom/twitchbg.png';
                    }
                    node.querySelectorAll && node.querySelectorAll('img[src*="socialstream.ninja/sources/images/twitch.png"]').forEach(img => {
                        console.log('[KRIS] Replacing Twitch icon in child');
                        img.src = 'https://krisenigma.github.io/socialstream-custom/twitchbg.png';
                    });
                }
            });
        });
    });

    if (document.body) {
        observer.observe(document.body, { childList: true, subtree: true });
        replaceTwitchIcons();
    } else {
        document.addEventListener('DOMContentLoaded', function() {
            observer.observe(document.body, { childList: true, subtree: true });
            replaceTwitchIcons();
        });
    }
    
    console.log('[KRIS] Script initialization complete');
})();
