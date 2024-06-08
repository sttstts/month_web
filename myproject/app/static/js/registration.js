document.addEventListener("DOMContentLoaded", function() {
    const registerButton = document.querySelector("button[type='submit']");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm-password");

    registerButton.addEventListener("click", function(event) {
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();

        if (email === "" || password === "" || confirmPassword === "") {
            alert("Пожалуйста, заполните все поля.");
            event.preventDefault();
        } else if (password !== confirmPassword) {
            alert("Пароль и подтверждение пароля не совпадают.");
            event.preventDefault();
        }
    });
});
