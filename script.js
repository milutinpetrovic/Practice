// Function to check if a username is unique
function isUsernameUnique(username) {
    var users = JSON.parse(localStorage.getItem('users') || '[]');
    return !users.some(function (user) { return user.username === username; });
}
// Function to check if an email is unique
function isEmailUnique(email) {
    var users = JSON.parse(localStorage.getItem('users') || '[]');
    return !users.some(function (user) { return user.email === email; });
}
// Function to validate email format
function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
// Function to register a new user
function registerUser() {
    var username = document.getElementById('username').value.trim();
    var fullName = document.getElementById('fullName').value.trim();
    var age = parseInt(document.getElementById('age').value, 10);
    var email = document.getElementById('email').value.trim();
    var password = document.getElementById('password').value;
    var repeatPassword = document.getElementById('repeatPassword').value;
    // Simple validation
    if (!username || !fullName || isNaN(age) || !email || !password || !repeatPassword) {
        alert('All fields must be filled out');
        return;
    }
    // Check for unique username
    if (!isUsernameUnique(username)) {
        alert('Username already exists. Please choose another.');
        return;
    }
    // Check for unique email
    if (!isEmailUnique(email)) {
        alert('Email already in use. Please use a different email.');
        return;
    }
    // Validate email format
    if (!isValidEmail(email)) {
        alert('Invalid email format. Please enter a valid email address.');
        return;
    }
    // Check if passwords match
    if (password !== repeatPassword) {
        alert('Passwords do not match. Please enter matching passwords.');
        return;
    }
    // Check for empty spaces in the username
    if (username.indexOf(' ') !== -1) {
        alert('Username cannot contain spaces');
        return;
    }
    // Check username length
    if (username.length > 16) {
        alert('Username must be 16 char max');
        return;
    }
    // Check full name length
    if (fullName.length > 256) {
        alert('Full Name must be 256 char max');
        return;
    }
    // Check if age is at least 18
    if (age < 18) {
        alert('You must be at least 18 years old to register');
        return;
    }
    // Password length and match validation
    if (password.length < 8 || password.length > 256 || password !== repeatPassword) {
        alert('Password must be between 8 and 256 characters, and the passwords must match');
        return;
    }
    // Create user object
    var newUser = { username: username, fullName: fullName, age: age, email: email, password: password };
    // Save user data to local storage
    var users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    // Clear the form
    document.getElementById('registrationForm').reset();
    // Update user listbox
    updateListBox();
    alert('User registered successfully!');
}
// Function to update the user selection listbox
function updateListBox() {
    var userList = document.getElementById('userList');
    userList.innerHTML = '';
    // "Select User" option
    var selectUserOption = document.createElement('option');
    selectUserOption.value = '';
    selectUserOption.text = 'Select User';
    userList.add(selectUserOption);
    var users = JSON.parse(localStorage.getItem('users') || '[]');
    users.forEach(function (user) {
        var option = document.createElement('option');
        option.value = user.username;
        option.text = user.username;
        userList.add(option);
    });
}
// Function to show the "logged in" page
function showLoggedInPage() {
    var selectedUsername = document.getElementById('userList').value;
    // Display the "logged in" page
    document.body.innerHTML = "\n      <h1>Hi, ".concat(selectedUsername, "!</h1>\n      <button onclick=\"logOut()\">Log Out</button>\n      <button onclick=\"deleteAccount('").concat(selectedUsername, "')\">Delete Account</button>\n    ");
}
// Function to log out (redirect to login page)
function logOut() {
    window.location.reload(); // Reload the page (back to the login page)
}
// Function to delete user account
function deleteAccount(username) {
    var users = JSON.parse(localStorage.getItem('users') || '[]');
    var updatedUsers = users.filter(function (user) { return user.username !== username; });
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    logOut(); // Redirect to the login page after deleting the account
}
// Initial setup
updateListBox();
//# sourceMappingURL=script.js.map