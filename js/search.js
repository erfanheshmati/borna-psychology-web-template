/**
 * Search Page JavaScript
 */

document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.querySelector(".search-input");
  const categoryCards = document.querySelectorAll(".category-card");

  if (searchInput) {
    // Handle search input
    searchInput.addEventListener("input", function (e) {
      const searchTerm = e.target.value.toLowerCase().trim();

      // If search term is empty, show all categories
      if (searchTerm === "") {
        categoryCards.forEach((card) => {
          card.style.display = "block";
        });
        return;
      }

      // Filter categories based on search term
      categoryCards.forEach((card) => {
        const cardTitle = card.querySelector("h3").textContent.toLowerCase();
        if (cardTitle.includes(searchTerm)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  }

  // Toggle active category
  const categoryButtons = document.querySelectorAll(".category-button");
  if (categoryButtons) {
    categoryButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Remove active class from all buttons
        categoryButtons.forEach((btn) => {
          btn.classList.remove("active-category");
        });

        // Add active class to clicked button
        this.classList.add("active-category");

        // Get category type from data attribute
        const categoryType = this.getAttribute("data-category");

        // Filter cards based on category type
        if (categoryType === "all") {
          categoryCards.forEach((card) => {
            card.style.display = "block";
          });
        } else {
          categoryCards.forEach((card) => {
            if (card.getAttribute("data-category") === categoryType) {
              card.style.display = "block";
            } else {
              card.style.display = "none";
            }
          });
        }
      });
    });
  }
});
