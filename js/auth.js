// Auth Module for Borna

// Utility functions
function showError(element, message) {
  // Remove any existing error
  removeError(element);

  // Add red border to the input
  if (element.id === "phone-input") {
    // For phone input, add red border to the parent div
    element.closest(".border").classList.add("border-red-500");
    element
      .closest(".border")
      .classList.remove(
        "border-[#E7E7E8]",
        "border-gray-200",
        "border-gray-300"
      );
  } else {
    // For other inputs
    element.classList.add("border-red-500");
  }

  // Find the specific error container for this element
  let errorContainer;

  if (element.id === "phone-input") {
    errorContainer = document.getElementById("phone-error");
  } else if (element.id === "terms") {
    errorContainer = document.getElementById("terms-error");
  } else {
    // Default behavior for other pages where containers aren't specifically defined
    // Create error message and insert after the element
    const errorMsg = document.createElement("p");
    errorMsg.classList.add("error-message", "text-red-500", "text-sm", "mt-1");
    errorMsg.textContent = message;
    element.parentNode.insertBefore(errorMsg, element.nextSibling);
    return;
  }

  // If we found a container, add the error message to it
  if (errorContainer) {
    const errorMsg = document.createElement("p");
    errorMsg.classList.add("error-message", "text-red-500", "text-sm");
    errorMsg.textContent = message;
    errorContainer.innerHTML = ""; // Clear previous errors
    errorContainer.appendChild(errorMsg);
  }
}

function removeError(element) {
  // Remove border
  if (element.id === "phone-input") {
    // For phone input, remove red border from the parent div
    const parentDiv = element.closest(".border");
    if (parentDiv) {
      parentDiv.classList.remove("border-red-500");
      parentDiv.classList.add("border-[#E7E7E8]");
    }
  } else {
    // For other inputs
    element.classList.remove("border-red-500");
  }

  // Clear error container if it exists
  if (element.id === "phone-input") {
    const errorContainer = document.getElementById("phone-error");
    if (errorContainer) errorContainer.innerHTML = "";
  } else if (element.id === "terms") {
    const errorContainer = document.getElementById("terms-error");
    if (errorContainer) errorContainer.innerHTML = "";
  } else {
    // Remove error message if exists (for other pages)
    const nextElement = element.nextElementSibling;
    if (nextElement && nextElement.classList.contains("error-message")) {
      nextElement.remove();
    }
  }
}

function validatePhoneNumber(phone) {
  // Validation rules:
  // 1. Must start with 0 or 9
  // 2. If starts with 0, must be 11 digits in total (like 09XXXXXXXXX)
  // 3. If starts with 9, must be 10 digits in total (like 9XXXXXXXXX)
  // 4. Must not be more than 11 digits

  // Check if empty
  if (!phone || phone.trim() === "") {
    return false;
  }

  // Remove any spaces or hyphens
  phone = phone.replace(/[\s-]/g, "");

  // Check if it contains only digits
  if (!/^\d+$/.test(phone)) {
    return false;
  }

  // Check if it starts with 0 and has 11 digits
  if (phone.startsWith("0")) {
    return phone.length === 11 && phone.startsWith("09");
  }

  // Check if it starts with 9 and has 10 digits
  if (phone.startsWith("9")) {
    return phone.length === 10;
  }

  // If we reach here, the format is not valid
  return false;
}

function validatePassword(password) {
  // Minimum 8 characters, at least one letter and one number
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return passwordRegex.test(password);
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Convert English numbers to Persian
function toPersianNum(num) {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return num.toString().replace(/[0-9]/g, function (d) {
    return persianDigits[parseInt(d)];
  });
}

// Login Page Functionality
if (document.getElementById("login-submit")) {
  const phoneInput = document.getElementById("phone-input");
  const termsCheckbox = document.getElementById("terms");
  const submitButton = document.getElementById("login-submit");

  // Initially disable submit button
  submitButton.disabled = true;

  // Enable/disable submit button based on inputs
  function checkLoginForm() {
    const phoneValue = phoneInput.value.trim();
    const termsChecked = termsCheckbox.checked;

    submitButton.disabled = !(phoneValue && termsChecked);

    if (phoneValue && termsChecked) {
      submitButton.classList.remove("bg-[#E7E7E8]", "text-[#CECED1]");
      submitButton.classList.add("bg-primary", "text-white");
    } else {
      submitButton.classList.add("bg-[#E7E7E8]", "text-[#CECED1]");
      submitButton.classList.remove("bg-primary", "text-white");
    }
  }

  // Add input events
  phoneInput.addEventListener("input", function () {
    const phoneValue = this.value.trim();

    // Clear error when input becomes empty
    if (!phoneValue) {
      removeError(this);
    } else if (validatePhoneNumber(phoneValue)) {
      removeError(this);
    }
    checkLoginForm();
  });

  termsCheckbox.addEventListener("change", function () {
    if (this.checked) {
      removeError(this);
    }
    checkLoginForm();
  });

  // Form submission
  submitButton.addEventListener("click", function (e) {
    e.preventDefault();

    let isValid = true;
    const phoneValue = phoneInput.value.trim();

    // Validate phone number
    if (!phoneValue) {
      showError(phoneInput, "لطفا شماره موبایل خود را وارد کنید");
      isValid = false;
    } else if (!validatePhoneNumber(phoneValue)) {
      showError(
        phoneInput,
        "شماره موبایل باید با 0 یا 9 شروع شود و بیش از 11 رقم نباشد"
      );
      isValid = false;
    } else {
      removeError(phoneInput);
    }

    // Validate terms checkbox
    if (!termsCheckbox.checked) {
      showError(termsCheckbox, "لطفا با قوانین موافقت کنید");
      isValid = false;
    } else {
      removeError(termsCheckbox);
    }

    if (!isValid) {
      return;
    }

    // Store phone in sessionStorage for use on verify page
    sessionStorage.setItem("userPhone", phoneValue);

    // Simulate API call for sending verification code
    submitButton.disabled = true;
    submitButton.innerHTML = "در حال ارسال...";

    setTimeout(() => {
      // Redirect to verify page
      window.location.href = "verify.html";
    }, 1500);
  });
}

// Verification Page Functionality
if (document.getElementById("verify-submit")) {
  const otpInputs = document.querySelectorAll(".otp-input");
  const verifyButton = document.getElementById("verify-submit");
  const resendButton = document.getElementById("resend-code");
  const timerElement = document.getElementById("timer");
  const userPhoneElement = document.getElementById("user-phone");

  // Initially disable submit button
  verifyButton.disabled = true;

  // Display user phone
  const userPhone = sessionStorage.getItem("userPhone") || "09123456789";
  userPhoneElement.textContent = toPersianNum(userPhone);

  // Sort inputs by data-index to ensure correct left-to-right order
  const sortedInputs = Array.from(otpInputs).sort((a, b) => {
    return parseInt(a.dataset.index) - parseInt(b.dataset.index);
  });

  // Auto-focus next input when a digit is entered
  sortedInputs.forEach((input, index) => {
    // Handle all input events (not just keyboard)
    input.addEventListener("input", function (e) {
      // Ensure only numeric values are accepted
      this.value = this.value.replace(/[^0-9]/g, "");

      // If input has a value, move to next input
      if (this.value.length === 1 && index < sortedInputs.length - 1) {
        sortedInputs[index + 1].focus();
      }

      checkOtpForm();
    });

    // Handle keydown for special keys like backspace and arrow keys
    input.addEventListener("keydown", function (e) {
      // If backspace is pressed and field is empty, go to previous input
      if (e.key === "Backspace" && !this.value && index > 0) {
        sortedInputs[index - 1].focus();
      }
      // Right arrow key - move to next input (in LTR context)
      else if (e.key === "ArrowRight" && index < sortedInputs.length - 1) {
        sortedInputs[index + 1].focus();
      }
      // Left arrow key - move to previous input (in LTR context)
      else if (e.key === "ArrowLeft" && index > 0) {
        sortedInputs[index - 1].focus();
      }
    });

    // Handle paste event for OTP
    input.addEventListener("paste", function (e) {
      e.preventDefault();

      const pastedData = e.clipboardData.getData("text");
      if (/^\d+$/.test(pastedData)) {
        // Only numbers
        const digits = pastedData.split("");

        sortedInputs.forEach((input, i) => {
          if (i < digits.length) {
            input.value = digits[i];
          }
        });

        // Focus the last field or the field after the last pasted character
        const focusIndex = Math.min(digits.length, sortedInputs.length) - 1;
        sortedInputs[focusIndex].focus();

        checkOtpForm();
      }
    });

    // Select all text when input is focused
    input.addEventListener("focus", function () {
      setTimeout(() => this.select(), 0);
    });
  });

  // Check if all OTP inputs have values
  function checkOtpForm() {
    let isComplete = true;

    sortedInputs.forEach((input) => {
      if (!input.value) {
        isComplete = false;
      }
    });

    verifyButton.disabled = !isComplete;

    if (isComplete) {
      verifyButton.classList.remove("bg-[#E7E7E8]", "text-[#CECED1]");
      verifyButton.classList.add("bg-primary", "text-white");
    } else {
      verifyButton.classList.add("bg-[#E7E7E8]", "text-[#CECED1]");
      verifyButton.classList.remove("bg-primary", "text-white");
    }
  }

  // Set focus to first input when page loads
  if (sortedInputs.length > 0) {
    setTimeout(() => sortedInputs[0].focus(), 100);
  }

  // Timer functionality
  let timeLeft = 120; // 2 minutes

  function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    // Format time as mm:ss
    const formattedTime = `${toPersianNum(
      minutes.toString().padStart(2, "0")
    )}:${toPersianNum(seconds.toString().padStart(2, "0"))}`;

    timerElement.textContent = formattedTime;

    if (timeLeft === 0) {
      // Time is up, hide timer text and show resend button
      clearInterval(timerInterval);

      // Find the parent element containing the timer text
      const timerContainer = timerElement.closest("p");
      if (timerContainer) {
        timerContainer.style.display = "none";
      }

      resendButton.classList.remove("hidden");
    } else {
      timeLeft--;
    }
  }

  // Start timer
  updateTimer();
  const timerInterval = setInterval(updateTimer, 1000);

  // Resend code button
  resendButton.addEventListener("click", function () {
    // Reset timer
    timeLeft = 120;

    // Show timer container again
    const timerContainer = timerElement.closest("p");
    if (timerContainer) {
      timerContainer.style.display = "";
    }

    // Update timer display
    updateTimer();

    // Hide resend button
    resendButton.classList.add("hidden");

    // Restart interval
    clearInterval(timerInterval);
    const newTimerInterval = setInterval(updateTimer, 1000);

    // Simulate resending code
    // Here you would call your API
  });

  // Form submission
  verifyButton.addEventListener("click", function (e) {
    e.preventDefault();

    // Get entered OTP
    let otp = "";
    sortedInputs.forEach((input) => {
      otp += input.value;
    });

    // Simulate API call to verify OTP
    verifyButton.disabled = true;
    verifyButton.innerHTML = "در حال بررسی...";

    setTimeout(() => {
      // For demo purposes, we're assuming the OTP is correct
      // In a real app, you would verify with your backend

      // Redirect to index page
      window.location.href = "index.html";
    }, 1500);
  });
}

// Profile Completion Page Functionality
if (document.getElementById("profile-form")) {
  const profileForm = document.getElementById("profile-form");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const birthdateInput = document.getElementById("birthdate");
  const submitButton = document.getElementById("profile-submit");
  const togglePasswordButton = document.getElementById("toggle-password");

  // Toggle password visibility
  togglePasswordButton.addEventListener("click", function () {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      this.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5.25C4.5 5.25 1.5 12 1.5 12C1.5 12 4.5 18.75 12 18.75C19.5 18.75 22.5 12 22.5 12C22.5 12 19.5 5.25 12 5.25Z" stroke="#9D9EA2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 15.75C14.0711 15.75 15.75 14.0711 15.75 12C15.75 9.92893 14.0711 8.25 12 8.25C9.92893 8.25 8.25 9.92893 8.25 12C8.25 14.0711 9.92893 15.75 12 15.75Z" stroke="#9D9EA2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2.25 2.25L21.75 21.75" stroke="#9D9EA2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>`;
    } else {
      passwordInput.type = "password";
      this.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5.25C4.5 5.25 1.5 12 1.5 12C1.5 12 4.5 18.75 12 18.75C19.5 18.75 22.5 12 22.5 12C22.5 12 19.5 5.25 12 5.25Z" stroke="#9D9EA2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 15.75C14.0711 15.75 15.75 14.0711 15.75 12C15.75 9.92893 14.0711 8.25 12 8.25C9.92893 8.25 8.25 9.92893 8.25 12C8.25 14.0711 9.92893 15.75 12 15.75Z" stroke="#9D9EA2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>`;
    }
  });

  // Form validation
  profileForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let isValid = true;

    // Validate name
    if (!nameInput.value.trim()) {
      showError(nameInput, "لطفا نام و نام خانوادگی خود را وارد کنید");
      isValid = false;
    } else {
      removeError(nameInput);
    }

    // Validate email
    if (!validateEmail(emailInput.value.trim())) {
      showError(emailInput, "لطفا یک ایمیل معتبر وارد کنید");
      isValid = false;
    } else {
      removeError(emailInput);
    }

    // Validate password
    if (!validatePassword(passwordInput.value)) {
      showError(
        passwordInput,
        "رمز عبور باید حداقل ۸ کاراکتر و شامل حروف و اعداد باشد"
      );
      isValid = false;
    } else {
      removeError(passwordInput);
    }

    // Validate birthdate
    if (!birthdateInput.value) {
      showError(birthdateInput, "لطفا تاریخ تولد خود را انتخاب کنید");
      isValid = false;
    } else {
      removeError(birthdateInput);
    }

    if (isValid) {
      // Simulate API call to register user
      submitButton.disabled = true;
      submitButton.innerHTML = "در حال ثبت اطلاعات...";

      setTimeout(() => {
        // Store user data in localStorage (in a real app, this would be handled by your backend)
        const userData = {
          name: nameInput.value.trim(),
          email: emailInput.value.trim(),
          phone: sessionStorage.getItem("userPhone"),
          isLoggedIn: true,
        };

        localStorage.setItem("userData", JSON.stringify(userData));

        // Redirect to the homepage or dashboard
        window.location.href = "index.html";
      }, 1500);
    }
  });
}

// Check if user is logged in
function isLoggedIn() {
  const userData = localStorage.getItem("userData");
  if (userData) {
    try {
      const user = JSON.parse(userData);
      return user.isLoggedIn === true;
    } catch (e) {
      return false;
    }
  }
  return false;
}

// Logout functionality
function logout() {
  localStorage.removeItem("userData");
  sessionStorage.removeItem("userPhone");
  window.location.href = "login.html";
}

// Initialize any auth UI components
document.addEventListener("DOMContentLoaded", function () {
  // Add logout button event listeners
  const logoutButtons = document.querySelectorAll(".logout-button");
  logoutButtons.forEach((button) => {
    button.addEventListener("click", logout);
  });

  // Update UI based on auth state
  updateAuthUI();
});

// Update UI based on authentication state
function updateAuthUI() {
  const loggedIn = isLoggedIn();

  // Get all elements that should only be visible when logged in
  const authOnlyElements = document.querySelectorAll(".auth-only");

  // Get all elements that should only be visible when logged out
  const guestOnlyElements = document.querySelectorAll(".guest-only");

  // Update visibility
  authOnlyElements.forEach((el) => {
    el.style.display = loggedIn ? "" : "none";
  });

  guestOnlyElements.forEach((el) => {
    el.style.display = loggedIn ? "none" : "";
  });

  // Update user name if present
  const userNameElements = document.querySelectorAll(".user-name");
  if (loggedIn) {
    const userData = JSON.parse(localStorage.getItem("userData"));
    userNameElements.forEach((el) => {
      el.textContent = userData.name;
    });
  }
}
