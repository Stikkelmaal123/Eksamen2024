// script.js

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