const nameInput = document.getElementById('nameinp');
const nameButton = document.getElementById('form-container');

nameButton.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameinp = nameInput.value;
    const currentUrl = window.location.origin;
    const url = currentUrl + "/index.html?username=" + nameinp;
    window.location.replace(url);
    nameInput.value = '';
});

