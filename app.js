function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Fetch the test credentials file (Replace with the actual path)
    fetch('credentials.Json')
        .then(response => response.json())
        .then(data => {
            // Check if the entered username and password match any stored credentials
            if (checkCredentials(data, username, password)) {
                document.getElementById("message").textContent = "Access granted";
            } else {
                document.getElementById("message").textContent = "Access denied";
            }
        })
        .catch(error => {
           // console.error('Error fetching credentials:', error);
        });
}

function checkCredentials(storedCredentials, inputUsername, inputPassword) {
    // Check if the entered credentials match any stored credentials
    return storedCredentials.some(({ username, password }) => {
        return inputUsername === username && inputPassword === password;
    });
}
