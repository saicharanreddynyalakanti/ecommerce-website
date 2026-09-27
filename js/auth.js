/*
  auth.js
  -------
  Handles CLIENT-SIDE VALIDATION ONLY for login.html and register.html.

  IMPORTANT: There is no server, no database, and no real account system.
  Submitting these forms does not create or check a real user. We simply
  validate the input shapes (is the email formatted correctly? do the
  passwords match?) and show a success message. This is a common,
  honest pattern for a portfolio project's UI layer.
*/

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");

  if (loginForm) {
    loginForm.addEventListener("submit", handleLoginSubmit);
  }

  if (registerForm) {
    registerForm.addEventListener("submit", handleRegisterSubmit);
  }
});

// Simple regex to check for a "something@something.something" shape.
// Not perfect, but standard for a beginner-level frontend form.
function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function handleLoginSubmit(event) {
  event.preventDefault(); // stop the browser's default full-page-reload submit

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  let isValid = true;

  if (!isValidEmail(email)) {
    showError("email-error");
    isValid = false;
  } else {
    hideError("email-error");
  }

  if (password.length < 6) {
    showError("password-error");
    isValid = false;
  } else {
    hideError("password-error");
  }

  if (isValid) {
    alert("Login form validated successfully. (Demo only — no real login occurred.)");
    event.target.reset();
  }
}

function handleRegisterSubmit(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  let isValid = true;

  if (name === "") {
    showError("name-error");
    isValid = false;
  } else {
    hideError("name-error");
  }

  if (!isValidEmail(email)) {
    showError("email-error");
    isValid = false;
  } else {
    hideError("email-error");
  }

  if (password.length < 6) {
    showError("password-error");
    isValid = false;
  } else {
    hideError("password-error");
  }

  if (confirmPassword !== password || confirmPassword === "") {
    showError("confirm-password-error");
    isValid = false;
  } else {
    hideError("confirm-password-error");
  }

  if (isValid) {
    alert("Registration form validated successfully. (Demo only — no real account was created.)");
    event.target.reset();
  }
}

function showError(elementId) {
  document.getElementById(elementId).style.display = "block";
}

function hideError(elementId) {
  document.getElementById(elementId).style.display = "none";
}
