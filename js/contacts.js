document.addEventListener("DOMContentLoaded", function() {
    const submitButton = document.querySelector("button[type='submit']");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    submitButton.addEventListener("click", function(event) {
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
