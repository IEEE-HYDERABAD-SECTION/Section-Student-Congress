/**
 * Main Application Initialization
 * Handles app-wide initialization and setup
 */

/**
 * Initialize Lucide icons
 */
function initializeIcons() {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  } else {
    console.warn('Lucide icons library not loaded');
  }
}

/**
 * Initialize the application
 */
function init() {
  // Initialize icons
  initializeIcons();
  
  // Additional initialization can go here
  console.log('IEEE Hyderabad Section SAC website initialized');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

