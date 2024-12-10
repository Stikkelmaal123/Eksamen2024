// Function to handle login
document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();  // Prevent the page from refreshing on form submit
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    await login(username, password);  // Call the login function
  });
  
  // Your login function
  async function login(username, password) {
    const response = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: username, password: password }),
    });
  
    const data = await response.json();
    
    if (response.ok) {
        // Store the JWT token in localStorage on successful login
        localStorage.setItem('portainerToken', data.portainerToken);
        console.log('Authenticated and token saved to localStorage');
    } else {
        console.error('Login failed:', data.message);
    }
  }
  
  // Login end