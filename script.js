function validateForm() {
    const username = document.getElementById('username').value.trim();
    const fullName = document.getElementById('fullName').value;
    const age = document.getElementById('age').value;
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const repeatPassword = document.getElementById('repeatPassword').value;

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


    //localStorage.setItem("username", username);
    //localStorage.setItem("fullName", fullName);
    //localStorage.setItem("age", age);
    //localStorage.setItem("email", email);
    //localStorage.setItem("password", password);
    //localStorage.setItem("repeatPassword", repeatPassword);

    let userRecords = new Array();
    userRecords = JSON.parse(localStorage.getItem("users")) ? JSON.parse(localStorage.getItem("users")) : []
    if (userRecords.some((v) => {
        return v.email == email

    })) {
        alert("This email already exists!");

    } else {
        userRecords.push({
            "username": username,
            "fullName": fullName,
            "age": age,
            "email": email,
            "password": password,
            "repeatPassword": repeatPassword
        })
        localStorage.setItem("users", JSON.stringify(userRecords));
        // Redirect to the success page
        window.location.href = 'success.html';
    }



}

