document.addEventListener("DOMContentLoaded", function() {
    const loginButton = document.querySelector("button[type='button']");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");

    loginButton.addEventListener("click", function() {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (username === "" || password === "") {
            alert("Пожалуйста, заполните все поля.");
        } else {
            console.log("Логин:", username);
            console.log("Пароль:", password);
        }
    });
});
