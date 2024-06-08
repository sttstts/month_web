document.addEventListener("DOMContentLoaded", function() {
    const loginButton = document.querySelector("button[type='submit']");
    const usernameInput = document.getElementById("login");
    const passwordInput = document.getElementById("password");

    loginButton.addEventListener("click", function(event) {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (username === "" || password === "") {
            event.preventDefault();
            alert("Пожалуйста, заполните все поля.");
        } else {
            console.log("Логин:", username);
            console.log("Пароль:", password);
        }
    });
});
