/**
 * Navigation Module
 * Handles view switching and tab navigation
 */

/**
 * Switch between different views (home, team, contact)
 * @param {string} viewId - The ID of the view to show
 */
function switchView(viewId) {
  // Hide all views
  document.getElementById("home-view").classList.add("hidden");
  document.getElementById("team-view").classList.add("hidden");
  document.getElementById("contact-view").classList.add("hidden");

  // Show selected view
  const selected = document.getElementById(viewId + "-view");
  if (selected) {
    selected.classList.remove("hidden");
    // Scroll to top
    window.scrollTo(0, 0);

    // Re-initialize animations or canvas if hitting home
    if (viewId === "home") {
      // Optionally restart canvas animation if needed
    }
  }
}

/**
 * Switch between tabs within a view (e.g., Advisory/Team/Organising Committee tabs)
 * @param {string} tabName - The name of the tab to show
 */
function switchTab(tabName) {
  const tabs = ["advisory", "team", "organising-committee"];
  
  // Reset all tab styles
  tabs.forEach(tab => {
    const tabElement = document.getElementById("tab-" + tab);
    const contentElement = document.getElementById("content-" + tab);
    
    if (tabElement) {
      tabElement.classList.remove("tab-active");
      tabElement.classList.replace("text-ieee-blue", "text-slate-500");
    }
    
    if (contentElement) {
      contentElement.classList.add("hidden");
    }
  });

  // Activate selected tab
  const selectedTab = document.getElementById("tab-" + tabName);
  const selectedContent = document.getElementById("content-" + tabName);
  
  if (selectedTab) {
    selectedTab.classList.add("tab-active");
    selectedTab.classList.replace("text-slate-500", "text-ieee-blue");
  }
  
  if (selectedContent) {
    selectedContent.classList.remove("hidden");
  }
}

/**
 * Handle mobile navigation menu toggling
 */
document.addEventListener("DOMContentLoaded", () => {
  const mobileMenu = document.getElementById("mobile-menu");
  if (!mobileMenu) return;

  const body = document.body;
  const openButtons = document.querySelectorAll('[data-mobile-menu="open"]');
  const closeButtons = document.querySelectorAll('[data-mobile-menu="close"]');
  const menuLinks = mobileMenu.querySelectorAll("a");

  const setExpanded = (state) => {
    openButtons.forEach((btn) => btn.setAttribute("aria-expanded", state ? "true" : "false"));
    mobileMenu.setAttribute("aria-hidden", state ? "false" : "true");
  };

  const openMenu = () => {
    // Remove hidden class first
    mobileMenu.classList.remove("hidden");
    // Force reflow to ensure display change takes effect
    void mobileMenu.offsetHeight;
    // Add menu-open class to trigger animation
    requestAnimationFrame(() => {
      mobileMenu.classList.add("menu-open");
    });
    body.classList.add("overflow-hidden");
    setExpanded(true);
  };

  const closeMenu = () => {
    // Remove open class first to trigger close animation
    mobileMenu.classList.remove("menu-open");
    // Wait for animation to complete before hiding
    setTimeout(() => {
      mobileMenu.classList.add("hidden");
      body.classList.remove("overflow-hidden");
      setExpanded(false);
    }, 300); // Match CSS transition duration
  };

  openButtons.forEach((btn) => btn.addEventListener("click", openMenu));
  closeButtons.forEach((btn) => btn.addEventListener("click", closeMenu));
  menuLinks.forEach((link) => link.addEventListener("click", closeMenu));

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  setExpanded(false);
});
