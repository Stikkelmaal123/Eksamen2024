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




// dark mode code below

const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
  
    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }
}

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
    else {        document.documentElement.setAttribute('data-theme', 'light');
          localStorage.setItem('theme', 'light');
    }    
}


toggleSwitch.addEventListener('change', switchTheme, false);

// group page javascript

// JavaScript for toggling .group-links-container visibility

document.addEventListener("DOMContentLoaded", () => {
    // Select all action buttons
    const actionButtons = document.querySelectorAll(".actions-groups button");

    // Variable to track the currently open dropdown
    let currentlyOpenDropdown = null;

    actionButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            e.stopPropagation(); // Prevent event from bubbling to document

            // Find the corresponding dropdown
            const groupLinksContainer = button.nextElementSibling;

            // Close the currently open dropdown if it exists and is not the same as the clicked one
            if (currentlyOpenDropdown && currentlyOpenDropdown !== groupLinksContainer) {
                currentlyOpenDropdown.style.display = "none";
            }

            // Toggle visibility of the clicked dropdown
            if (groupLinksContainer.style.display === "flex") {
                groupLinksContainer.style.display = "none";
                currentlyOpenDropdown = null;
            } else {
                groupLinksContainer.style.display = "flex";
                currentlyOpenDropdown = groupLinksContainer;
            }
        });
    });

    // Close the dropdown if clicking anywhere outside
    document.addEventListener("click", () => {
        if (currentlyOpenDropdown) {
            currentlyOpenDropdown.style.display = "none";
            currentlyOpenDropdown = null;
        }
    });
});

// modals

// Select all buttons that open modals and all modals
const openButtons = document.querySelectorAll("[data-open-modal]");
const closeButtons = document.querySelectorAll("[data-close-modal]");
const modals = document.querySelectorAll("[data-modal]");

// Open the corresponding modal
openButtons.forEach(button => {
    button.addEventListener("click", () => {
        const modalId = button.getAttribute("data-open-modal");
        const modal = document.querySelector(`[data-modal="${modalId}"]`);
        if (modal) {
            modal.style.display = "flex"; // Fallback
            modal.showModal(); // Show the modal
        }
    });
});

// Close the corresponding modal
closeButtons.forEach(button => {
    button.addEventListener("click", () => {
        const modal = button.closest("dialog[data-modal]");
        if (modal) {
            modal.close();
            modal.style.display = "none"; // Fallback
        }
    });
});




// Close modals when the Esc key is pressed
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        modals.forEach(modal => {
            if (modal.open) {
                modal.close();
                modal.style.display = "none"; // Fallback
            }
        });
    }
});

// Ensure all modals are hidden initially (fallback for unsupported browsers)
modals.forEach(modal => {
    if (!modal.open) {
        modal.style.display = "none";
    }
});


// Dynamically manage users in the user list
/*const userList = document.getElementById("user-list");

userList.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-user-btn")) {
        const listItem = event.target.closest("li");
        listItem.remove();
    }
});*/

// Handle "Create Group" button functionality
/* document.querySelector(".btn-create-group").addEventListener("click", () => {
    const groupName = document.getElementById("group-name").value.trim();
    const expirationDate = document.getElementById("expiration-date").value;
    const selectedEducations = Array.from(
        document.querySelectorAll(".education-select input:checked")
    ).map((checkbox) => checkbox.nextElementSibling.textContent);

    if (!groupName || !expirationDate || selectedEducations.length === 0) {
        alert("Please fill in all required fields!");
        return;
    }

    alert(
        `Group Created Successfully!\n\nName: ${groupName}\nEducations: ${selectedEducations.join(
            ", "
        )}\nExpiration Date: ${expirationDate}`
    );
});
*/
// Handle "Edit" button clicks
const editButtons = document.querySelectorAll(".edit-btn");
const editModal = document.querySelector('dialog[data-modal="edit-user"]');
const editNameInput = document.getElementById("edit-name");
const editEmailInput = document.getElementById("edit-email");

// Add event listeners to each "Edit" button
editButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        const row = event.target.closest("tr");
        const name = row.querySelector("td:nth-child(1)").textContent.trim();
        const email = row.querySelector("td:nth-child(2)").textContent.trim();

        // Pre-fill the modal fields with user data
        editNameInput.value = name;
        editEmailInput.value = email;

        // Open the modal
        editModal.style.display = "flex"; // Fallback for unsupported browsers
        editModal.showModal();
    });
});

// Add close button functionality for the "Edit User" modal
const editCloseButton = editModal.querySelector(".close-btn");
editCloseButton.addEventListener("click", () => {
    editModal.close();
    editModal.style.display = "none"; // Fallback
});


// Select the "Manage Users" button and the corresponding modal
const manageUsersButton = document.getElementById("manage-users");
const manageUsersModal = document.querySelector('[data-modal="manage-users"]');

// Add an event listener to the button to open the modal
manageUsersButton.addEventListener("click", () => {
    manageUsersModal.style.display = "flex"; // Fallback for unsupported browsers
    manageUsersModal.showModal(); // Show the modal
});

// Add close functionality to the "Manage Users" modal
const manageUsersCloseButton = manageUsersModal.querySelector(".close-btn");

manageUsersCloseButton.addEventListener("click", () => {
    manageUsersModal.close();
    manageUsersModal.style.display = "none"; // Fallback
});


// Select all "Edit" buttons within the "Manage Users" modal
const manageUsersEditButtons = document.querySelectorAll('.manage-users-modal .edit-btn');
const manageUserModal = document.querySelector('[data-modal="manage-user"]');

// Add event listeners to each "Edit" button inside "Manage Users" modal
manageUsersEditButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        const row = event.target.closest("tr");
        const name = row.querySelector("td:nth-child(1)").textContent.trim();
        const email = row.querySelector("td:nth-child(2)").textContent.trim();

        // Populate the "Manage User" modal fields with user data
        manageUserModal.querySelector('#user-name').value = name;
        manageUserModal.querySelector('#user-email').value = email;

        // Open the "Manage User" modal
        manageUserModal.style.display = "flex"; // Fallback for unsupported browsers
        manageUserModal.showModal();
    });
});

// Add close functionality for the "Manage User" modal
const manageUserCloseButton = manageUserModal.querySelector(".close-btn");

manageUserCloseButton.addEventListener("click", () => {
    manageUserModal.close();
    manageUserModal.style.display = "none"; // Fallback
});

// Select the "Delete stacks" button inside the "Group stacks" modal
const deleteStacksButton = document.querySelector('#delete-stacks');

// Select the "Delete stacks" modal
const deleteStacksModal = document.querySelector('[data-modal="delete-stacks"]');

// Add an event listener to the button to open the "Delete stacks" modal
deleteStacksButton.addEventListener('click', () => {
    if (deleteStacksModal) {
        deleteStacksModal.style.display = "flex"; // Fallback for unsupported browsers
        deleteStacksModal.showModal(); // Show the modal
    }
});

// Ensure the "Delete stacks" modal can be closed
const deleteStacksModalCloseButton = deleteStacksModal.querySelector(".close-btn");

deleteStacksModalCloseButton.addEventListener('click', () => {
    deleteStacksModal.close();
    deleteStacksModal.style.display = "none"; // Fallback
});

