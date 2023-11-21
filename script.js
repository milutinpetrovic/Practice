function validateForm() {
    var email = document.getElementById('email').value.trim();
    var username = document.getElementById('username').value.trim();
    var fullName = document.getElementById('fullName').value;
    var age = document.getElementById('age').value;
    var password = document.getElementById('password').value;
    var repeatPassword = document.getElementById('repeatPassword').value;

    // Simple validation
    if (email === '' || username === '' || fullName === '' || age === '' || password === '' || repeatPassword === '') {
        alert('All fields must be filled out');
        return;
    }

    // Email format validation
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Invalid email format');
        return;
    }

    // Check for empty spaces in the username
    if (username.indexOf(' ') !== -1) {
        alert('Username cannot contain spaces');
        return;
    }

    // Check username length
    if (username.length > 16) {
        alert('Username must be max 16 characters');
        return;
    }

    // Check full name length
    if (fullName.length > 256) {
        alert('Full Name must be max 256 characters');
        return;
    }

    // Check if age is at least 18
    if (parseInt(age) < 18) {
        alert('You must be at least 18 years old to register');
        return;
    }

    // Password length and match validation
    if (password.length < 8 || password.length > 256 || password !== repeatPassword) {
        alert('Password must be between 8 and 256 characters, and the passwords must match');
        return;
    }

    // Redirect to the success page
    window.location.href = 'success.html';
}

