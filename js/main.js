// Mobile Menu Toggle
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");
let menuOverlay = null;
let closeButton = null;

if (mobileMenuButton && mobileMenu) {
  mobileMenuButton.addEventListener("click", () => {
    if (mobileMenu.classList.contains("hidden")) {
      // Create overlay
      menuOverlay = document.createElement("div");
      menuOverlay.className = "fixed inset-0 bg-black bg-opacity-50 z-20";
      document.body.appendChild(menuOverlay);

      // Add click event to close menu when clicking outside
      menuOverlay.addEventListener("click", () => {
        closeMenu();
      });

      // Create close button
      closeButton = document.createElement("button");
      closeButton.className = "absolute top-5 left-4 z-40";
      closeButton.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 6L6 18" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M6 6L18 18" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`;
      closeButton.addEventListener("click", () => {
        closeMenu();
      });

      // Show menu
      mobileMenu.classList.remove("hidden");
      mobileMenu.classList.add(
        "fixed",
        "top-0",
        "left-0",
        "right-0",
        "bg-white",
        "z-30",
        "p-4",
        "pt-16", // Add padding top to make room for close button
        "shadow-lg"
      );

      // Add close button to the document
      document.body.appendChild(closeButton);
    } else {
      closeMenu();
    }

    mobileMenuButton.classList.toggle("open");
  });

  // Function to close the menu
  function closeMenu() {
    // Hide menu
    mobileMenu.classList.add("hidden");
    mobileMenu.classList.remove(
      "fixed",
      "top-0",
      "left-0",
      "right-0",
      "bg-white",
      "z-30",
      "p-4",
      "pt-16",
      "shadow-lg"
    );

    // Remove overlay
    if (menuOverlay) {
      document.body.removeChild(menuOverlay);
      menuOverlay = null;
    }

    // Remove close button
    if (closeButton) {
      document.body.removeChild(closeButton);
      closeButton = null;
    }

    // Toggle button state if it's in 'open' state
    if (mobileMenuButton.classList.contains("open")) {
      mobileMenuButton.classList.remove("open");
    }
  }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      window.scrollTo({
        top: target.offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// Card hover effects
const cards = document.querySelectorAll(".card");
cards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.classList.add("scale-105", "transition-transform");
  });

  card.addEventListener("mouseleave", () => {
    card.classList.remove("scale-105");
  });
});

// Form validation
const forms = document.querySelectorAll("form");
forms.forEach((form) => {
  form.addEventListener("submit", (e) => {
    let isValid = true;
    const requiredFields = form.querySelectorAll("[required]");

    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        isValid = false;
        field.classList.add("border-red-500");

        // Create or show error message
        let errorMsg = field.nextElementSibling;
        if (!errorMsg || !errorMsg.classList.contains("error-message")) {
          errorMsg = document.createElement("p");
          errorMsg.classList.add(
            "error-message",
            "text-red-500",
            "text-sm",
            "mt-1"
          );
          field.parentNode.insertBefore(errorMsg, field.nextSibling);
        }
        errorMsg.textContent = "این فیلد الزامی است";
      } else {
        field.classList.remove("border-red-500");
        const errorMsg = field.nextElementSibling;
        if (errorMsg && errorMsg.classList.contains("error-message")) {
          errorMsg.textContent = "";
        }
      }
    });

    if (!isValid) {
      e.preventDefault();
    }
  });
});

// Newsletter subscription
const newsletterForm = document.getElementById("newsletter-form");
if (newsletterForm) {
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const emailInput = newsletterForm.querySelector('input[type="email"]');

    if (emailInput && emailInput.value.trim()) {
      // Here you would typically send the email to your server
      const successMessage = document.createElement("p");
      successMessage.classList.add("text-green-500", "mt-2");
      successMessage.textContent = "با تشکر! ایمیل شما با موفقیت ثبت شد.";

      // Clear input and append success message
      emailInput.value = "";
      newsletterForm.appendChild(successMessage);

      // Remove success message after 3 seconds
      setTimeout(() => {
        successMessage.remove();
      }, 3000);
    }
  });
}
