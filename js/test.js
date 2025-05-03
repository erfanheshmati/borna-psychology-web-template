// MBTI Test Functionality

document.addEventListener("DOMContentLoaded", function () {
  // DOM elements
  const optionItems = document.querySelectorAll(".test-option");
  const nextButton = document.querySelector(".next-button");
  const prevButton = document.querySelector(".prev-button");
  const progressBar = document.querySelector(".progress-bar");
  const questionCounter = document.querySelector(".question-counter");
  const questionNumber = document.querySelector(".question-number");

  // Test state
  const totalQuestions = 100;
  let currentQuestion = 3; // Starting at question 3 as per design
  let userAnswers = {};

  // Initialize the test
  function initTest() {
    updateProgress();
    setupOptionSelection();
    setupNavigationButtons();
  }

  // Function to convert English numbers to Persian
  function convertToPersianNumerals(text) {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return text.replace(/[0-9]/g, function (d) {
      return persianDigits[parseInt(d)];
    });
  }

  // Update progress bar and counter
  function updateProgress() {
    if (progressBar) {
      const progressPercentage = (currentQuestion / totalQuestions) * 100;
      progressBar.style.width = `${progressPercentage}%`;
    }

    if (questionCounter) {
      // Convert to Persian numerals
      const persianCurrent = convertToPersianNumerals(
        currentQuestion.toString()
      );
      const persianTotal = convertToPersianNumerals(totalQuestions.toString());
      questionCounter.textContent = `${persianCurrent} / ${persianTotal}`;
    }

    if (questionNumber) {
      // Convert question number to Persian
      questionNumber.textContent = `.${convertToPersianNumerals(
        currentQuestion.toString()
      )}`;
    }
  }

  // Set up option selection functionality
  function setupOptionSelection() {
    if (optionItems) {
      optionItems.forEach((option) => {
        option.addEventListener("click", function () {
          // Remove selection from all options
          optionItems.forEach((item) => {
            item
              .querySelector(".option-circle")
              .classList.remove("bg-[#8bc94d]");
            item
              .querySelector(".option-circle")
              .classList.add("border", "border-black");

            // Remove check icon if exists
            const checkIcon = item.querySelector(".check-icon");
            if (checkIcon) {
              checkIcon.remove();
            }
          });

          // Add selection to clicked option
          const optionCircle = this.querySelector(".option-circle");
          optionCircle.classList.remove("border", "border-black");
          optionCircle.classList.add("bg-[#8bc94d]");

          // Add check icon
          const checkIcon = document.createElement("div");
          checkIcon.className = "check-icon";
          checkIcon.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12L10 17L19 8" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          `;
          optionCircle.appendChild(checkIcon);

          // Save the answer
          const optionValue = this.getAttribute("data-value");
          userAnswers[currentQuestion] = optionValue;
        });
      });
    }
  }

  // Set up navigation buttons
  function setupNavigationButtons() {
    if (nextButton) {
      nextButton.addEventListener("click", function () {
        if (currentQuestion < totalQuestions) {
          // In a real implementation, you would save the current answer
          // and load the next question here
          currentQuestion++;
          updateProgress();

          // Simulate loading next question
          clearSelection();
          // This would typically fetch and display the next question
        }
      });
    }

    if (prevButton) {
      prevButton.addEventListener("click", function () {
        if (currentQuestion > 1) {
          currentQuestion--;
          updateProgress();

          // Simulate loading previous question and selected answer
          clearSelection();
          // This would typically fetch and display the previous question
          // and highlight the previously selected answer
        }
      });
    }
  }

  // Clear all selected options
  function clearSelection() {
    if (optionItems) {
      optionItems.forEach((option) => {
        const optionCircle = option.querySelector(".option-circle");
        optionCircle.classList.remove("bg-green-500");
        optionCircle.classList.add("border", "border-black");

        const checkIcon = option.querySelector(".check-icon");
        if (checkIcon) {
          checkIcon.remove();
        }
      });
    }
  }

  // Submit test results
  function submitTest() {
    // Here you would typically send the userAnswers to the server
    console.log("Test submitted:", userAnswers);

    // Redirect to results page or show results
    // window.location.href = 'test-results.html';
  }

  // Initialize the test when the page loads
  initTest();
});
