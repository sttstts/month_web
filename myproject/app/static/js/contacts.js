document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");

    form.addEventListener("submit", function(event) {
        const emailInput = document.getElementById("email");
        const messageInput = document.getElementById("message");

        const email = emailInput.value.trim();
        const message = messageInput.value.trim();

        if (email === "" || message === "") {
            alert("Пожалуйста, заполните все поля.");
            event.preventDefault(); 
        } else {
            console.log("Email:", email);
            console.log("Сообщение:", message);
        }
    });
});
