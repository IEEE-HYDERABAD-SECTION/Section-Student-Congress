/**
 * Main Application Initialization
 * Handles app-wide initialization and setup
 */

/**
 * Initialize Lucide icons
 */
function initializeIcons() {
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  } else {
    console.warn("Lucide icons library not loaded");
  }
}

/**
 * Initialize the application
 */
function init() {
  try {
    // Initialize icons
    initializeIcons();

    // Add error handling for images
    const images = document.querySelectorAll("img");
    images.forEach(img => {
      img.addEventListener("error", function () {
        console.warn("Image failed to load:", this.src);
        // Keep the image but log the error instead of breaking the page
      });
    });

    // Additional initialization can go here
    console.log("IEEE Hyderabad Section SAC website initialized");
  } catch (error) {
    console.error("Error initializing application:", error);
    // Don't break the page if there's an error
  }
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

// Global error handler
window.addEventListener(
  "error",
  function (event) {
    console.error("Global error:", event.error);
    // Prevent default error handling that might show error pages
    return false;
  },
  true
);
