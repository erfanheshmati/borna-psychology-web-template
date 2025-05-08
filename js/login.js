// Close button functionality
document.getElementById("close-button").addEventListener("click", function () {
  // Navigate back to the previous page
  window.history.back();
});

const phoneInput = document.getElementById("phone-input");
const phoneInputWrapper = document.getElementById("phone-input-wrapper");

phoneInput.addEventListener("focus", function () {
  phoneInputWrapper.classList.add("border-primary-dark");
});
phoneInput.addEventListener("blur", function () {
  phoneInputWrapper.classList.remove("border-primary-dark");
});

// Enable/disable login button based on input and checkbox
const loginSubmit = document.getElementById("login-submit");
const termsCheckbox = document.getElementById("terms");

function isValidIranianPhone(phone) {
  // Accepts 09xxxxxxxxx or 9xxxxxxxxx (11 or 10 digits, only numbers)
  return /^0?9\d{9}$/.test(phone);
}

function showPhoneError(message) {
  const errorDiv = document.getElementById("phone-error");
  errorDiv.textContent = message;
  errorDiv.classList.add("text-red-500", "text-sm");
}

function clearPhoneError() {
  const errorDiv = document.getElementById("phone-error");
  errorDiv.textContent = "";
  errorDiv.classList.remove("text-red-500", "text-sm");
}

let phoneTouched = false;

function updateLoginButtonState() {
  const phone = phoneInput.value.trim();
  const termsChecked = termsCheckbox.checked;
  // Enable button if checkbox is checked
  if (termsChecked) {
    loginSubmit.disabled = false;
    loginSubmit.classList.remove(
      "bg-[#E7E7E8]",
      "text-[#CECED1]",
      "bg-opacity-60"
    );
    loginSubmit.classList.add("bg-primary", "text-white");
  } else {
    loginSubmit.disabled = true;
    loginSubmit.classList.add(
      "bg-[#E7E7E8]",
      "text-[#CECED1]",
      "bg-opacity-60"
    );
    loginSubmit.classList.remove("bg-primary", "text-white");
  }
  // Clear error on input change
  if (!phoneTouched) {
    clearPhoneError();
  }
}

phoneInput.addEventListener("input", function () {
  phoneTouched = false;
  updateLoginButtonState();
});
termsCheckbox.addEventListener("change", updateLoginButtonState);

// Redirect to verify page on submit
loginSubmit.addEventListener("click", function (e) {
  const phone = phoneInput.value.trim();
  phoneTouched = true;
  // Show error and prevent redirect if phone is invalid
  if (phone.length === 0) {
    showPhoneError("شماره موبایل خود را وارد کنید");
    e.preventDefault();
    return;
  } else if (!/^0?9/.test(phone) || phone.length > 11) {
    showPhoneError(
      "شماره موبایل باید با 0 یا ۹ شروع شده و بیش از ۱۱ رقم نباشد"
    );
    e.preventDefault();
    return;
  } else if (!isValidIranianPhone(phone)) {
    showPhoneError("شماره موبایل معتبر نیست");
    e.preventDefault();
    return;
  }
  clearPhoneError();
  // Disable button and show 'ارسال...'
  loginSubmit.disabled = true;
  loginSubmit.classList.add("bg-opacity-80");
  loginSubmit.textContent = "ارسال...";
  // Optionally, delay redirect to show the loading state
  setTimeout(function () {
    window.location.href = "verify.html";
  }, 800);
});

updateLoginButtonState();
