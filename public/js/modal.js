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

// Close modals when clicking outside of modal content
modals.forEach(modal => {
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.close();
            modal.style.display = "none"; // Fallback
        }
    });
});

// Ensure all modals are hidden initially (fallback for unsupported browsers)
modals.forEach(modal => {
    if (!modal.open) {
        modal.style.display = "none";
    }
});


// Dynamically manage users in the user list
const userList = document.getElementById("user-list");

userList.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-user-btn")) {
        const listItem = event.target.closest("li");
        listItem.remove();
    }
});

// Handle "Create Group" button functionality
document.querySelector(".btn-create-group").addEventListener("click", () => {
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

/*document.getElementById("delete-stacks").addEventListener("click", () => {
    if (confirm("Are you sure you want to delete all stacks?")) {
        alert("Stacks deleted successfully!");
    }
});

const deleteButtons = document.querySelectorAll(".delete-btn");
deleteButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        const row = event.target.closest("tr");
        row.remove();
    });
});*/

/*document.getElementById("save-details").addEventListener("click", () => {
    const expirationDate = document.getElementById("expiration-date").value;
    const selectedEducations = Array.from(
        document.querySelectorAll(".education-options input:checked")
    ).map((checkbox) => checkbox.nextElementSibling.textContent);

    if (!expirationDate || selectedEducations.length === 0) {
        alert("Please fill out all fields.");
        return;
    }

    alert(`Details saved!\nExpiration Date: ${expirationDate}\nEducations: ${selectedEducations.join(", ")}`);
});

document.getElementById("delete-group").addEventListener("click", () => {
    if (confirm("Are you sure you want to delete this group?")) {
        alert("Group deleted successfully.");
    }
});*/

/* // Get all buttons with class 'action-btn'
const actionButtons = document.querySelectorAll(".action-btn");

// Modals for each action
const modals = {
    edit: document.querySelector('dialog[data-modal="edit"]'),
    delete: document.querySelector('dialog[data-modal="delete"]'),
    view: document.querySelector('dialog[data-modal="view"]'),
};

// Attach click listeners to buttons
actionButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        const action = button.getAttribute("data-action");
        const row = button.closest("tr");
        const name = row.querySelector("td:nth-child(1)").textContent.trim();
        const email = row.querySelector("td:nth-child(2)").textContent.trim();

        handleModalAction(action, { name, email });
    });
});

// Function to handle modal actions
function handleModalAction(action, data) {
    const modal = modals[action];
    if (!modal) return;

    // Populate modal content based on action
    if (action === "edit") {
        document.getElementById("edit-name").value = data.name;
        document.getElementById("edit-email").value = data.email;
    } else if (action === "delete") {
        document.getElementById("delete-name").textContent = data.name;
    } else if (action === "view") {
        document.getElementById("view-name").textContent = data.name;
        document.getElementById("view-email").textContent = data.email;
    }

    // Open the modal
    modal.style.display = "flex"; // Fallback for unsupported browsers
    modal.showModal();
}

// Close modal logic (reusable)
document.querySelectorAll("[data-close-modal]").forEach((closeButton) => {
    closeButton.addEventListener("click", () => {
        const modal = closeButton.closest("dialog");
        if (modal) {
            modal.close();
            modal.style.display = "none"; // Fallback
        }
    });
}); */