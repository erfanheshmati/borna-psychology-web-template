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

  const questions = [
    {
      type: "multi", // or "single" if you want radio, or "textarea"
      text: "از خودم شناخت کامل دارم.",
      options: [
        "کاملا موافقم",
        "موافقم",
        "نظری ندارم",
        "مخالفم",
        "کاملا مخالفم",
      ],
    },
    {
      type: "multi",
      text: "در جمع احساس راحتی می‌کنم.",
      options: ["کاملا موافقم", "موافقم", "کاملا مخالفم"],
    },
    {
      type: "textarea",
      text: "نظر خود را بنویسید.",
      options: [],
    },
    // ... add more questions as needed
  ];

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
          const optionValue = this.getAttribute("data-value");
          const optionCircle = this.querySelector(".option-circle");
          let selected = false;

          // Initialize array for this question if not present
          if (!userAnswers[currentQuestion]) {
            userAnswers[currentQuestion] = [];
          }

          // Check if this value is already selected
          const index = userAnswers[currentQuestion].indexOf(optionValue);
          if (index === -1) {
            // Not selected, so select it
            userAnswers[currentQuestion].push(optionValue);
            selected = true;
          } else {
            // Already selected, so unselect it
            userAnswers[currentQuestion].splice(index, 1);
            selected = false;
          }

          // Toggle visual state
          if (selected) {
            optionCircle.classList.remove("border", "border-black");
            optionCircle.classList.add("bg-[#8bc94d]");
            // Add check icon if not present
            if (!optionCircle.querySelector(".check-icon")) {
              const checkIcon = document.createElement("div");
              checkIcon.className = "check-icon";
              checkIcon.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12L10 17L19 8" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              `;
              optionCircle.appendChild(checkIcon);
            }
          } else {
            optionCircle.classList.remove("bg-[#8bc94d]");
            optionCircle.classList.add("border", "border-black");
            // Remove check icon if present
            const checkIcon = optionCircle.querySelector(".check-icon");
            if (checkIcon) {
              checkIcon.remove();
            }
          }
        });
      });
    }
  }

  // Set up navigation buttons
  function setupNavigationButtons() {
    if (nextButton) {
      nextButton.addEventListener("click", function () {
        if (currentQuestion < totalQuestions) {
          currentQuestion++;
          updateProgress();

          // If the next question is a textarea question (e.g., question 4)
          if (currentQuestion === 4) {
            showTextareaQuestion();
          } else {
            showOptionsQuestion();
          }
        }
      });
    }

    if (prevButton) {
      prevButton.addEventListener("click", function () {
        if (currentQuestion > 1) {
          currentQuestion--;
          updateProgress();

          // If the previous question is a textarea question
          if (currentQuestion === 4) {
            showTextareaQuestion();
          } else {
            showOptionsQuestion();
          }
        }
      });
    }
  }

  // Show textarea for open-ended question
  function showTextareaQuestion() {
    const optionsContainer = document.querySelector(".space-y-4");
    if (optionsContainer) {
      optionsContainer.innerHTML = `
        <div class="w-full">
          <textarea id="open-ended-textarea" rows="5" class="w-full border focus:border-primary-dark focus:outline-none rounded-lg p-3 text-right" placeholder="پاسخ خود را بنویسید..."></textarea>
        </div>
      `;
      // Restore previous answer if exists
      const textarea = document.getElementById("open-ended-textarea");
      if (textarea && userAnswers[4]) {
        textarea.value = userAnswers[4];
      }
      textarea &&
        textarea.addEventListener("input", function () {
          userAnswers[4] = this.value;
        });
    }
  }

  // Show options for normal questions
  function showOptionsQuestion() {
    const optionsContainer = document.querySelector(".space-y-4");
    if (optionsContainer) {
      // You may want to dynamically load question/option text here. For now, just reload the page or reset options.
      // For demo, reload the page to restore options (not ideal for SPA, but works for static demo)
      window.location.reload();
    }
  }

  // Clear all selected options
  function clearSelection() {
    if (optionItems) {
      optionItems.forEach((option) => {
        const optionCircle = option.querySelector(".option-circle");
        optionCircle.classList.remove("bg-[#8bc94d]");
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

  function renderCurrentQuestion() {
    const question = questions[currentQuestion - 1]; // assuming currentQuestion is 1-based
    const optionsContainer = document.querySelector(".space-y-4");
    const questionText = document.querySelector(".question-text");

    if (questionText) {
      questionText.textContent = question.text;
    }

    if (question.type === "textarea") {
      optionsContainer.innerHTML = `
        <div class="w-full">
          <textarea id="open-ended-textarea" rows="5" class="w-full border focus:border-primary-dark focus:outline-none rounded-lg p-3 text-right" placeholder="پاسخ خود را بنویسید..."></textarea>
        </div>
      `;
      const textarea = document.getElementById("open-ended-textarea");
      if (textarea && userAnswers[currentQuestion]) {
        textarea.value = userAnswers[currentQuestion];
      }
      textarea &&
        textarea.addEventListener("input", function () {
          userAnswers[currentQuestion] = this.value;
        });
    } else {
      optionsContainer.innerHTML = question.options
        .map(
          (opt, idx) => `
        <div class="test-option flex items-center gap-2 bg-[#EEEEEE] rounded-3xl p-3 cursor-pointer"
          data-value="${idx + 1}">
          <div class="option-circle border border-black rounded-full mr-4 w-5 h-5 md:w-6 md:h-6 flex items-center justify-center"></div>
          <span class="text-sm md:text-base">${opt}</span>
        </div>
      `
        )
        .join("");
      setupOptionSelection(); // re-attach event listeners
    }
  }

  // Initialize the test when the page loads
  initTest();
});
