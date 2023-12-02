 function showInfo(message) {
        const customAlertContainer = document.getElementById('customAlertContainer');
        const alertMessageText = document.getElementById('alertMessageText');

        alertMessageText.innerText = message;

        customAlertContainer.style.right = '20px';

        setTimeout(() => {
            closeCustomAlert();
        }, 10000);
    }

    function closeCustomAlert() {
        const customAlertContainer = document.getElementById('customAlertContainer');
        customAlertContainer.style.right = '-300px';
    }