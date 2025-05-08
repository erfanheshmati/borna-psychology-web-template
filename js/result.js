// Initial percentages for each trait
const traitPercents = {
  ei: 43, // Extrovert/Introvert
  sn: 43, // Sensing/Intuition
  tf: 43, // Thinking/Feeling
  jp: 43, // Judging/Perceiving
};

function updateTrait(trait) {
  const percent = traitPercents[trait];
  document.getElementById(`${trait}-percent`).textContent = percent + "%";
  document.getElementById(`${trait}-bar`).style.width = percent + 3.2 + "%"; // 3.2% offset for bar
  document.getElementById(`${trait}-dot`).style.left = percent + "%";
}

function changePercent(trait, delta) {
  traitPercents[trait] = Math.max(
    0,
    Math.min(100, traitPercents[trait] + delta)
  );
  updateTrait(trait);
}

// Initialize all traits on page load
document.addEventListener("DOMContentLoaded", function () {
  Object.keys(traitPercents).forEach(updateTrait);
});

function setPercentByBar(trait, clientX) {
  const barWrapper = document.getElementById(`${trait}-bar-wrapper`);
  const rect = barWrapper.getBoundingClientRect();
  let percent = ((clientX - rect.left) / rect.width) * 100;
  percent = Math.max(0, Math.min(100, Math.round(percent)));
  traitPercents[trait] = percent;
  updateTrait(trait);
}

function enableBarDrag(trait) {
  const barWrapper = document.getElementById(`${trait}-bar-wrapper`);
  let dragging = false;

  function onMove(e) {
    let clientX;
    if (e.touches) {
      clientX = e.touches[0].clientX;
    } else {
      clientX = e.clientX;
    }
    setPercentByBar(trait, clientX);
  }

  barWrapper.addEventListener("mousedown", function (e) {
    dragging = true;
    onMove(e);
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", function mouseUpHandler() {
      dragging = false;
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", mouseUpHandler);
    });
  });

  // Touch support
  barWrapper.addEventListener("touchstart", function (e) {
    dragging = true;
    onMove(e);
    document.addEventListener("touchmove", onMove);
    document.addEventListener("touchend", function touchEndHandler() {
      dragging = false;
      document.removeEventListener("touchmove", onMove);
      document.removeEventListener("touchend", touchEndHandler);
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  Object.keys(traitPercents).forEach((trait) => {
    updateTrait(trait);
    enableBarDrag(trait);
  });

  // Marriage Compatibility Section drag-to-change bars
  function enableVerticalBarDrag(wrapperId, barId) {
    const wrapper = document.getElementById(wrapperId);
    const bar = document.getElementById(barId);
    if (!wrapper || !bar) return;
    let dragging = false;

    function onMove(e) {
      let clientY;
      if (e.touches) {
        clientY = e.touches[0].clientY;
      } else {
        clientY = e.clientY;
      }
      const rect = wrapper.getBoundingClientRect();
      let percent = ((rect.bottom - clientY) / rect.height) * 100;
      percent = Math.max(0, Math.min(100, Math.round(percent)));
      bar.style.height = percent + "%";
    }

    wrapper.addEventListener("mousedown", function (e) {
      dragging = true;
      onMove(e);
      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", function mouseUpHandler() {
        dragging = false;
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", mouseUpHandler);
      });
    });
    // Touch support
    wrapper.addEventListener("touchstart", function (e) {
      dragging = true;
      onMove(e);
      document.addEventListener("touchmove", onMove);
      document.addEventListener("touchend", function touchEndHandler() {
        dragging = false;
        document.removeEventListener("touchmove", onMove);
        document.removeEventListener("touchend", touchEndHandler);
      });
    });
  }

  // Ideal (5 bars)
  for (let i = 1; i <= 5; i++) {
    enableVerticalBarDrag(`ideal-bar-wrapper-${i}`, `ideal-bar-${i}`);
  }
  // Most (3 bars)
  for (let i = 1; i <= 3; i++) {
    enableVerticalBarDrag(`most-bar-wrapper-${i}`, `most-bar-${i}`);
  }
  // Average (4 bars)
  for (let i = 1; i <= 4; i++) {
    enableVerticalBarDrag(`avg-bar-wrapper-${i}`, `avg-bar-${i}`);
  }
  // Least (4 bars)
  for (let i = 1; i <= 4; i++) {
    enableVerticalBarDrag(`least-bar-wrapper-${i}`, `least-bar-${i}`);
  }
});
