document.addEventListener("DOMContentLoaded", function() {
    const registerButton = document.querySelector("button[type='button']");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm-password");

    registerButton.addEventListener("click", function() {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();

        if (username === "" || password === "" || confirmPassword === "") {
            alert("Пожалуйста, заполните все поля.");
        } else if (password !== confirmPassword) {
            alert("Пароль и подтверждение пароля не совпадают.");
        } else {
            console.log("Логин:", username);
            console.log("Пароль:", password);
        }
    });
});
