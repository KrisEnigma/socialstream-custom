(function() {
    'use strict';
    
    console.log('[KRIS] Script loaded successfully');
    
    // Inject custom CSS from GitHub
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://raw.githubusercontent.com/KrisEnigma/socialstream-custom/main/kris.css';
    document.head.appendChild(link);
    console.log('[KRIS] CSS injected');
    
    const originalSrcDescriptor = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'src');
    
    Object.defineProperty(HTMLImageElement.prototype, 'src', {
        set: function(value) {
            if (value && value.includes('socialstream.ninja/sources/images/twitch.png')) {
                console.log('[KRIS] Replacing Twitch icon:', value);
                // Replace with GitHub-hosted image
                originalSrcDescriptor.set.call(this, 'https://raw.githubusercontent.com/KrisEnigma/socialstream-custom/main/twitchbg.png');
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
            img.src = 'https://raw.githubusercontent.com/KrisEnigma/socialstream-custom/main/twitchbg.png';
        });
    }
    
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            mutation.addedNodes.forEach(function(node) {
                if (node.nodeType === 1) { // Element node
                    if (node.tagName === 'IMG' && node.src && node.src.includes('socialstream.ninja/sources/images/twitch.png')) {
                        console.log('[KRIS] Replacing Twitch icon in new node');
                        node.src = 'https://raw.githubusercontent.com/KrisEnigma/socialstream-custom/main/twitchbg.png';
                    }
                    node.querySelectorAll && node.querySelectorAll('img[src*="socialstream.ninja/sources/images/twitch.png"]').forEach(img => {
                        console.log('[KRIS] Replacing Twitch icon in child');
                        img.src = 'https://raw.githubusercontent.com/KrisEnigma/socialstream-custom/main/twitchbg.png';
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
