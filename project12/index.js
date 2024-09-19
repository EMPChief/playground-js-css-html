// Select the DOM elements for the password display, copy button, generate button, and password length input
const passwordDisplay = document.querySelector(".generated-password-input");
const copyButton = document.querySelector(".copy-button");
const generateButton = document.querySelector(".generate-button");
const passwordLengthInput = document.querySelector(".password-length-input");

// Define character sets for generating the password
const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCase = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+";

// Combine all character sets
const allCharacters = upperCase + lowerCase + numbers + symbols;

// Function to generate a random password
function generatePassword() {
  // Parse the desired password length from the input
  const length = parseInt(passwordLengthInput.value);
  let password = "";

  // Ensure the password length is at least 4 characters
  if (length < 4) {
    passwordDisplay.value = "Password length must be at least 4 characters.";
    // Exit the function if the condition is not met
    return;
  }

  // Add one character from each character set to ensure password diversity
  password += upperCase[Math.floor(Math.random() * upperCase.length)];
  password += lowerCase[Math.floor(Math.random() * lowerCase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += symbols[Math.floor(Math.random() * symbols.length)];

  // Fill the rest of the password with random characters from all character sets
  while (password.length < length) {
    password += allCharacters[Math.floor(Math.random() * allCharacters.length)];
  }

  // Shuffle the password characters to ensure randomness
  password = password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
  // Display the generated password
  passwordDisplay.value = password;
}

// Function to copy the generated password to the clipboard
function copyPassword() {
  if (passwordDisplay.value) {
    // Copy password to clipboard
    navigator.clipboard.writeText(passwordDisplay.value);
    // Update button text to indicate success
    copyButton.textContent = "Copied!";
    // Reset button text after 2 seconds
    setTimeout(() => (copyButton.textContent = "Copy"), 2000);
  }
}

// Add event listeners for the copy and generate buttons
copyButton.addEventListener("click", copyPassword);
generateButton.addEventListener("click", generatePassword);
