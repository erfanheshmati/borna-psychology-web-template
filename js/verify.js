// Close button functionality
document.getElementById("close-button").addEventListener("click", function () {
  // Navigate back to the previous page
  window.history.back();
});

// OTP auto-focus logic for verify.html
(function () {
  const otpInputs = document.querySelectorAll(".otp-input");
  const submitBtn = document.getElementById("verify-submit");
  if (!otpInputs.length || !submitBtn) return;

  // Always focus the first OTP input on page load
  otpInputs[0].focus();

  function checkOtpFilled() {
    const allFilled = Array.from(otpInputs).every(
      (input) => input.value.length === 1
    );
    if (allFilled) {
      submitBtn.disabled = false;
      submitBtn.classList.remove("bg-[#E7E7E8]", "text-[#CECED1]");
      submitBtn.classList.add("bg-primary", "text-white", "cursor-pointer");
    } else {
      submitBtn.disabled = true;
      submitBtn.classList.add("bg-[#E7E7E8]", "text-[#CECED1]");
      submitBtn.classList.remove("bg-primary", "text-white", "cursor-pointer");
    }
  }

  otpInputs.forEach((input, idx) => {
    input.addEventListener("input", function (e) {
      const value = input.value;
      if (value.length === 1 && idx < otpInputs.length - 1) {
        otpInputs[idx + 1].focus();
      }
      checkOtpFilled();
    });
    input.addEventListener("keydown", function (e) {
      if (e.key === "Backspace" && !input.value && idx > 0) {
        otpInputs[idx - 1].focus();
      } else if (e.key === "ArrowLeft" && idx > 0) {
        otpInputs[idx - 1].focus();
      } else if (e.key === "ArrowRight" && idx < otpInputs.length - 1) {
        otpInputs[idx + 1].focus();
      }
    });
  });

  // Initial check
  checkOtpFilled();

  submitBtn.addEventListener("click", function (e) {
    if (!submitBtn.disabled) {
      submitBtn.disabled = true;
      submitBtn.textContent = "در حال ورود...";
      submitBtn.classList.add("opacity-70", "cursor-not-allowed");
      // Simulate a short delay before redirect (optional, for UX)
      setTimeout(function () {
        window.location.href = "index.html";
      }, 1000);
    }
  });
})();

// Timer and resend code logic
(function () {
  const timerEl = document.getElementById("timer");
  const resendBtn = document.getElementById("resend-code");
  if (!timerEl || !resendBtn) return;

  let timerDuration = 120; // seconds
  let timerInterval;

  function toPersian(num) {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return num.toString().replace(/[0-9]/g, (d) => persianDigits[+d]);
  }

  function updateTimerDisplay(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    timerEl.textContent = `${toPersian(
      min.toString().padStart(2, "0")
    )}:${toPersian(sec.toString().padStart(2, "0"))}`;
  }

  function startTimer() {
    let timeLeft = timerDuration;
    updateTimerDisplay(timeLeft);
    resendBtn.classList.add("hidden");
    timerEl.parentElement.style.display = "";
    timerInterval = setInterval(() => {
      timeLeft--;
      updateTimerDisplay(timeLeft);
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        timerEl.parentElement.style.display = "none";
        resendBtn.classList.remove("hidden");
      }
    }, 1000);
  }

  resendBtn.addEventListener("click", function () {
    startTimer();
  });

  startTimer();
})();
