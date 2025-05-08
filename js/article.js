// Copy Link Button Logic
const copyLinkButtons = document.querySelectorAll("button");
let copyLinkButton = null;
copyLinkButtons.forEach((btn) => {
  if (btn.textContent && btn.textContent.trim().includes("کپی لینک پست")) {
    copyLinkButton = btn;
  }
});
if (copyLinkButton) {
  copyLinkButton.addEventListener("click", function () {
    // Copy current page URL
    navigator.clipboard.writeText(window.location.href).then(
      function () {
        showCopyNotification("لینک پست کپی شد!");
      },
      function () {
        showCopyNotification("خطا در کپی لینک!");
      }
    );
  });
}

// Share Button Logic
const shareButtons = document.querySelectorAll("button");
let shareButton = null;
shareButtons.forEach((btn) => {
  if (btn.textContent && btn.textContent.trim().includes("اشتراک گذاری")) {
    shareButton = btn;
  }
});
if (shareButton) {
  shareButton.addEventListener("click", function () {
    if (navigator.share) {
      navigator
        .share({
          title: document.title,
          url: window.location.href,
        })
        .catch(() => {
          showCopyNotification("اشتراک‌گذاری لغو شد.");
        });
    } else {
      navigator.clipboard.writeText(window.location.href).then(
        function () {
          showCopyNotification("لینک برای اشتراک‌گذاری کپی شد!");
        },
        function () {
          showCopyNotification("خطا در کپی لینک!");
        }
      );
    }
  });
}

function showCopyNotification(message) {
  // Remove existing notification if present
  const existing = document.getElementById("copy-link-notification");
  if (existing) existing.remove();

  const notif = document.createElement("div");
  notif.id = "copy-link-notification";
  notif.textContent = message;
  notif.className =
    "fixed top-8 left-1/2 -translate-x-1/2 bg-primary text-white px-6 py-3 rounded-lg shadow-lg z-50 text-base";
  notif.style.transform = "translateX(-50%)";
  notif.style.transition = "opacity 0.4s";
  notif.style.opacity = "1";
  document.body.appendChild(notif);
  setTimeout(() => {
    notif.style.opacity = "0";
    setTimeout(() => notif.remove(), 500);
  }, 3000);
}
