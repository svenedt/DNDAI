function showModal(suggestion) {
  document.getElementById('suggestion').value = suggestion;
  document.getElementById('modal').style.display = 'block';
  document.getElementById('overlay').style.display = 'block';
}
function hideModal() {
  document.getElementById('modal').style.display = 'none';
  document.getElementById('overlay').style.display = 'none';
}
function accept() {
  alert('Accepted: ' + document.getElementById('suggestion').value);
  hideModal();
}
function edit() {
  alert('Edit mode (not implemented in test harness).');
}
function reroll() {
  document.getElementById('suggestion').value = 'Rerolled suggestion!';
}
function cancel() {
  alert('Cancelled.');
  hideModal();
} 