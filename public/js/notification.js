const customAlert = document.getElementById('customAlert');
const alertMessage = document.getElementById('alertMessage');
const closeButton = document.getElementById('closeButton');

closeButton.addEventListener('click', function () {
  customAlert.style.display = 'none';
  mainFormRemove();
});

function showAlert(message) {
  customAlert.style.display = 'block';
  alertMessage.textContent = message;
  mainForm();

}

function mainForm() {
  document.getElementById('MainForm').classList.add('mainFormAdd');
}
function mainFormRemove() {
  document.getElementById('MainForm').classList.remove('mainFormAdd');
}
