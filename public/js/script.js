// script.js


document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.querySelector(".sidebar");
  const sidebarToggle = document.querySelector(".sidebar-toggle");

  if (!sidebar || !sidebarToggle) {
    console.error("Sidebar or toggle button not found!");
    return;
  }

  // Function to toggle the sidebar overlay on mobile
  function toggleSidebar() {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      sidebar.classList.toggle("sidebar-overlay");
    }
  }

  // Function to ensure proper classes are applied based on screen size
  function handleResize() {
    const isMobile = window.innerWidth <= 768;
    if (!isMobile) {
      // Remove overlay class when switching to larger screens
      sidebar.classList.remove("sidebar-overlay");
    }
  }

  // Add click event listener to the toggle button
  sidebarToggle.addEventListener("click", toggleSidebar);

  // Add resize event listener to handle screen size changes
  window.addEventListener("resize", handleResize);

  // Run handleResize initially to set the correct class based on screen size
  handleResize();
});






document.addEventListener('DOMContentLoaded', function() {
  // Hide all details rows initially
  const detailsRows = document.querySelectorAll('.details-row');
  detailsRows.forEach(row => {
    row.style.display = 'none'; // Ensure all details rows are hidden on page load
  });
});

function toggleDetails(row) {
  // Hide any other open details row
  const openDetails = document.querySelector('.details-row.show');
  if (openDetails && openDetails.previousElementSibling !== row) {
    openDetails.classList.remove('show');
    openDetails.previousElementSibling.classList.remove('expanded');
    openDetails.style.display = 'none';
  }

  // Toggle the selected row's details
  const nextRow = row.nextElementSibling;
  if (nextRow && nextRow.classList.contains('details-row')) {
    if (nextRow.style.display === 'grid') {
      nextRow.style.display = 'none';
      nextRow.classList.remove('show');
      row.classList.remove('expanded');
    } else {
      nextRow.style.display = 'grid';
      nextRow.classList.add('show');
      row.classList.add('expanded');
    }
  }
}

function toggleMobileOnlyDetails() {
  const isMobile = window.innerWidth <= 768;
  const mobileOnlyElements = document.querySelectorAll('[data-mobile-only]');

  mobileOnlyElements.forEach(el => {
    el.style.display = isMobile ? 'block' : 'none';
  });
}

// Add event listener for window resize
window.addEventListener('resize', toggleMobileOnlyDetails);

// Initial check on page load
toggleMobileOnlyDetails();