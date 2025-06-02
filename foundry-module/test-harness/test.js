let lastActiveElement = null;
function showModal(suggestion) {
  console.info("[TestHarness] Showing modal with suggestion:", suggestion);
  document.getElementById("suggestion").value = suggestion;
  document.getElementById("modal").style.display = "block";
  document.getElementById("overlay").style.display = "block";
  lastActiveElement = document.activeElement;
  document.getElementById("modal").focus();
  setTimeout(() => document.getElementById("suggestion").focus(), 10);
}
function hideModal() {
  console.info("[TestHarness] Hiding modal.");
  document.getElementById("modal").style.display = "none";
  document.getElementById("overlay").style.display = "none";
  if (lastActiveElement) lastActiveElement.focus();
}
function accept() {
  const val = document.getElementById("suggestion").value;
  console.info("[TestHarness] Accepted suggestion:", val);
  alert("Accepted: " + val);
  hideModal();
}
function edit() {
  console.warn("[TestHarness] Edit mode not implemented.");
  alert("Edit mode (not implemented in test harness).");
}
function reroll() {
  console.info("[TestHarness] Rerolling suggestion.");
  document.getElementById("suggestion").value = "Rerolled suggestion!";
}
function cancel() {
  console.info("[TestHarness] Cancelled.");
  alert("Cancelled.");
  hideModal();
}

// Trap focus in modal and ESC to close
const modal = document.getElementById("modal");
modal.addEventListener("keydown", (e) => {
  const focusable = modal.querySelectorAll("button, textarea");
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (e.key === "Tab") {
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  } else if (e.key === "Escape") {
    hideModal();
  }
});
