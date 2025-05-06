document.addEventListener("DOMContentLoaded", function () {
  // Elements
  const categoryTabs = document.querySelectorAll(".category-tab");
  const blogItems = document.querySelectorAll(".blog-item");
  const paginationButtons = document.querySelectorAll(".pagination-btn");

  console.log("Blog JS loaded");
  console.log("Found blog items:", blogItems.length);
  console.log("Found pagination buttons:", paginationButtons.length);

  // Settings
  const itemsPerPage = 6;
  let currentPage = 1;
  let currentCategory = "all";

  // Initialize
  updateDisplay();

  // Category Tab Click Event
  categoryTabs.forEach((tab) => {
    tab.addEventListener("click", function (e) {
      e.preventDefault();

      // Update active tab
      categoryTabs.forEach((t) =>
        t.classList.remove(
          "active",
          "text-primary",
          "border-b",
          "border-primary",
          "font-medium"
        )
      );
      this.classList.add(
        "active",
        "text-primary",
        "border-b",
        "border-primary",
        "font-medium"
      );

      // Set current category
      currentCategory = this.getAttribute("data-category");
      console.log("Category changed to:", currentCategory);

      // Reset to first page when changing category
      currentPage = 1;

      // Update display
      updateDisplay();
    });
  });

  // Pagination Button Click Event
  paginationButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();

      const page = this.getAttribute("data-page");
      console.log("Pagination button clicked:", page);

      if (page === "prev") {
        if (currentPage > 1) {
          currentPage--;
          console.log("Moving to previous page:", currentPage);
        }
      } else if (page === "next") {
        const filteredItems = getFilteredItems();
        const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
        console.log("Total pages:", totalPages, "Current page:", currentPage);

        if (currentPage < totalPages) {
          currentPage++;
          console.log("Moving to next page:", currentPage);
        } else {
          console.log("Already at last page, cannot go next");
        }
      } else {
        currentPage = parseInt(page);
        console.log("Jumping to page:", currentPage);
      }

      updateDisplay();
    });
  });

  // Filter items based on current category
  function getFilteredItems() {
    if (currentCategory === "all") {
      return Array.from(blogItems);
    } else {
      return Array.from(blogItems).filter((item) => {
        const categories = item.getAttribute("data-category");
        return categories && categories.includes(currentCategory);
      });
    }
  }

  // Update display based on current category and page
  function updateDisplay() {
    const filteredItems = getFilteredItems();
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

    console.log("Updating display. Filtered items:", filteredItems.length);
    console.log("Total pages:", totalPages, "Current page:", currentPage);

    // Hide all items first
    blogItems.forEach((item) => {
      item.style.display = "none";
    });

    // Show items for current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    console.log("Displaying items from index", startIndex, "to", endIndex);

    filteredItems.slice(startIndex, endIndex).forEach((item) => {
      item.style.display = "";
    });

    // Update pagination
    updatePagination(totalPages);
  }

  // Update pagination display
  function updatePagination(totalPages) {
    // Update active page
    paginationButtons.forEach((button) => {
      const page = button.getAttribute("data-page");

      if (page !== "prev" && page !== "next") {
        if (parseInt(page) === currentPage) {
          button.classList.add(
            "active",
            "bg-[#3C3D45]",
            "text-white",
            "font-medium"
          );
          button.classList.remove("bg-[#F7F7F8]", "text-[#6D6D74]");
        } else {
          button.classList.remove(
            "active",
            "bg-[#3C3D45]",
            "text-white",
            "font-medium"
          );
          button.classList.add("bg-[#F7F7F8]", "text-[#6D6D74]");
        }
      }
    });

    // Enable/disable prev button
    const prevButton = document.querySelector('[data-page="prev"]');
    if (prevButton) {
      if (currentPage === 1) {
        prevButton.classList.add("opacity-60");
      } else {
        prevButton.classList.remove("opacity-60");
      }
    }

    // Enable/disable next button
    const nextButton = document.querySelector('[data-page="next"]');
    if (nextButton) {
      console.log(
        "Next button found, updating state. Current page:",
        currentPage,
        "Total pages:",
        totalPages
      );
      if (currentPage >= totalPages) {
        nextButton.classList.add("opacity-60");
        console.log("Disabling next button");
      } else {
        nextButton.classList.remove("opacity-60");
        console.log("Enabling next button");
      }
    } else {
      console.log("Next button not found!");
    }
  }
});
