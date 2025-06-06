/* eslint-env browser */
/* eslint-disable no-unused-vars, no-trailing-spaces, curly, arrow-parens, prefer-arrow-callback, id-length, line-comment-position, comma-dangle, @babel/object-curly-spacing, @shopify/binary-assignment-parens, no-undef */

// Keep track of initialization state
let isImageLoadingInitialized = false;

document.addEventListener('DOMContentLoaded', () => {
  initializeImageLoading();
  
  // Set up observer to catch dynamically added images
  setupImageObserver();
});

/**
 * Set up MutationObserver to catch dynamically added images
 */
function setupImageObserver() {
  if (window.imageLoadingObserver) return;
  
  const observer = new MutationObserver((mutations) => {
    let shouldInitialize = false;
    
    mutations.forEach(mutation => {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        for (let i = 0; i < mutation.addedNodes.length; i++) {
          const node = mutation.addedNodes[i];
          if (node.nodeType === 1) { // Element node
            if ((node.classList && node.classList.contains('image-loading')) || 
                (node.querySelectorAll && node.querySelectorAll('.image-loading:not(.image-loaded)').length > 0)) {
              shouldInitialize = true;
              break;
            }
          }
        }
      }
    });
    
    if (shouldInitialize) {
      initializeImageLoading();
    }
  });
  
  observer.observe(document.body, { childList: true, subtree: true });
  window.imageLoadingObserver = observer;
}

/**
 * Main image loading function - handles the loading of all unloaded images
 */
window.initializeImageLoading = function(container = document) {
  const images = (container instanceof Document ? document : container).querySelectorAll('.image-loading:not(.image-loaded)');
  
  if (images.length === 0) {
    return Promise.resolve();
  }
  
  isImageLoadingInitialized = true;
  
  return Promise.all(Array.from(images).map(processImage));
};

/**
 * Process a single image - sets up proper event handlers and handles placeholders
 * Returns a promise that resolves when the image is loaded or errors
 */
function processImage(img) {
  return new Promise(resolve => {
    const isHoverImage = img.closest('.hover-image-container') !== null;
    
    // Handle case where image is already loaded
    if (img.complete && img.naturalWidth > 0) {
      img.classList.add('image-loaded');
      handlePlaceholder(img, isHoverImage);
      resolve();
      return;
    }
    
    // Handle load event
    img.onload = function() {
      img.classList.add('image-loaded');
      handlePlaceholder(img, isHoverImage);
      resolve();
    };
    
    // Handle error event - still mark as "loaded" to remove placeholders
    img.onerror = function() {
      img.classList.add('image-error');
      img.classList.add('image-loaded'); // Consider loaded but with error
      handlePlaceholder(img, isHoverImage);
      resolve();
    };
    
    // Double-check again in case it loaded during setup
    if (img.complete && img.naturalWidth > 0) {
      img.classList.add('image-loaded');
      handlePlaceholder(img, isHoverImage);
      resolve();
    }
  });
}

/**
 * Handle the placeholders for an image
 */
function handlePlaceholder(img, isHoverImage) {
  if (isHoverImage) return;
  
  const container = img.closest('.responsive-image-container');
  if (!container) return;
  
  const placeholder = container.querySelector('.image-placeholder');
  if (!placeholder) return;
  
  // Start fading out the placeholder
  placeholder.classList.add('image-placeholder-fading');
  
  // Remove after transition completes
  placeholder.addEventListener('transitionend', function(e) {
    // Only react to opacity transition
    if (e.propertyName === 'opacity' && placeholder.parentNode) {
      placeholder.remove();
    }
  }, { once: true });
}

// Set up event listeners for content updates
const contentUpdateEvents = [
  'load',
  'shopify:section:load',
  'theme:ajaxinate:updated',
  'theme:collection:updated', 
  'theme:cart:open',
  'page:loaded',
  'criticalReady'
];

contentUpdateEvents.forEach(eventName => {
  document.addEventListener(eventName, () => {
    initializeImageLoading();
    
    // Also try once more after a short delay - not a hack, just catches images that
    // might be added by scripts right after the event
    setTimeout(initializeImageLoading, 100);
  });
});

// Safari-specific fix: Re-initialize after a delay
if (window.Shopify && window.Shopify.designMode !== true) {
  setTimeout(() => {
    initializeImageLoading();
  }, 1000);
}

// Simple debug function that fixes stuck images
window.fixStuckImages = function() {
  const stuckImages = document.querySelectorAll('.image-loading:not(.image-loaded)');
  
  stuckImages.forEach(img => {
    img.classList.add('image-loaded');
    
    const container = img.closest('.responsive-image-container');
    if (container) {
      const placeholder = container.querySelector('.image-placeholder');
      if (placeholder && placeholder.parentNode) {
        placeholder.remove();
      }
    }
  });
  
  return `Fixed ${stuckImages.length} stuck images`;
};

// Helper function for debugging - doesn't force loading
window.checkImageLoadingStatus = function() {
  const notLoaded = document.querySelectorAll('.image-loading:not(.image-loaded)');
  const loaded = document.querySelectorAll('.image-loading.image-loaded');
  const errors = document.querySelectorAll('.image-loading.image-error');
  
  return {
    total: notLoaded.length + loaded.length,
    loaded: loaded.length,
    loading: notLoaded.length,
    errors: errors.length,
    notLoadedImages: Array.from(notLoaded).map(img => ({
      src: img.src,
      complete: img.complete,
      naturalWidth: img.naturalWidth
    }))
  };
};
