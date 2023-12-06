// User interface
interface User {
    username: string;
    fullName: string;
    age: number;
    email: string;
    password: string;
  }
  
  // Function to check if a username is unique
  function isUsernameUnique(username: string): boolean {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    return !users.some(user => user.username === username);
  }
  
  // Function to check if an email is unique
  function isEmailUnique(email: string): boolean {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    return !users.some(user => user.email === email);
  }
  
  // Function to validate email format
  function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  // Function to register a new user
  function registerUser(): void {
    const username: string = (document.getElementById('username') as HTMLInputElement).value.trim();
    const fullName: string = (document.getElementById('fullName') as HTMLInputElement).value.trim();
    const age: number = parseInt((document.getElementById('age') as HTMLInputElement).value, 10);
    const email: string = (document.getElementById('email') as HTMLInputElement).value.trim();
    const password: string = (document.getElementById('password') as HTMLInputElement).value;
    const repeatPassword: string = (document.getElementById('repeatPassword') as HTMLInputElement).value;
  
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
    const newUser: User = { username, fullName, age, email, password };
  
    // Save user data to local storage
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
  
    // Clear the form
    (document.getElementById('registrationForm') as HTMLFormElement).reset();
  
    // Update user listbox
    updateListBox();
  
    alert('User registered successfully!');
  }
  
  // Function to update the user selection listbox
  function updateListBox(): void {
    const userList: HTMLSelectElement = document.getElementById('userList') as HTMLSelectElement;
    userList.innerHTML = '';
  
    // "Select User" option
    const selectUserOption: HTMLOptionElement = document.createElement('option');
    selectUserOption.value = '';
    selectUserOption.text = 'Select User';
    userList.add(selectUserOption);
  
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    users.forEach(user => {
      const option: HTMLOptionElement = document.createElement('option');
      option.value = user.username;
      option.text = user.username;
      userList.add(option);
    });
  }
  
  // Function to show the "logged in" page
  function showLoggedInPage(): void {
    const selectedUsername: string = (document.getElementById('userList') as HTMLSelectElement).value;
  
    // Display the "logged in" page
    document.body.innerHTML = `
      <h1>Hi, ${selectedUsername}!</h1>
      <button onclick="logOut()">Log Out</button>
      <button onclick="deleteAccount('${selectedUsername}')">Delete Account</button>
    `;
  }
  
  // Function to log out (redirect to login page)
  function logOut(): void {
    window.location.reload(); // Reload the page (back to the login page)
  }
  
  // Function to delete user account
  function deleteAccount(username: string): void {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers: User[] = users.filter(user => user.username !== username);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    logOut(); // Redirect to the login page after deleting the account
  }
  
  // Initial setup
  updateListBox();
  