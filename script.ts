// User interface
interface User {
  username: string;
  fullName: string;
  age: number;
  email: string;
  password: string;
}

// Utility function to read from localStorage with error handling
function readFromLocalStorage(key: string): any {
  try {
    return JSON.parse(localStorage.getItem(key) || '[]');
  } catch (error) {
    console.error(`Error reading from localStorage (${key}):`, error);
    return [];
  }
}

// Utility function to write to localStorage with error handling
function writeToLocalStorage(key: string, data: any): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error writing to localStorage (${key}):`, error);
  }
}

// Utility function to delete from localStorage with error handling
function deleteFromLocalStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error deleting from localStorage (${key}):`, error);
  }
}

// Function to check if a username is unique
function isUsernameUnique(username: string): boolean {
  const users: User[] = readFromLocalStorage('users');
  return !users.some((user) => user.username === username);
}

// Function to check if an email is unique
function isEmailUnique(email: string): boolean {
  const users: User[] = readFromLocalStorage('users');
  return !users.some((user) => user.email === email);
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


  // Create user object
  const newUser: User = { username, fullName, age, email, password };

  // Attempt to save user data to local storage
  try {
    const users: User[] = readFromLocalStorage('users');
    users.push(newUser);
    writeToLocalStorage('users', users);

    // Clear the form
    (document.getElementById('registrationForm') as HTMLFormElement).reset();

    // Update user listbox
    updateListBox();

    alert('User registered successfully!');
  } catch (error) {
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      alert('LocalStorage is full. Please clear some space and try again.');
    } else {
      console.error('Error registering user:', error);
      alert('An error occurred during registration. Please try again.');
    }
  }
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

  const users: User[] = readFromLocalStorage('users');
  users.forEach((user) => {
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
  const users: User[] = readFromLocalStorage('users');
  const updatedUsers: User[] = users.filter((user) => user.username !== username);
  writeToLocalStorage('users', updatedUsers);
  logOut(); // Redirect to the login page after deleting the account
}

// Initial setup
updateListBox();
