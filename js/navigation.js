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
