document.addEventListener("DOMContentLoaded", function() {
    const paymentButton = document.querySelector(".payment-button");
    const cardNumberInput = document.querySelector("input[placeholder='Номер карты']");
    const expiryDateInput = document.querySelector("input[placeholder='Срок действия']");
    const cvvInput = document.querySelector("input[placeholder='CVV']");
    const emailInput = document.querySelector("input[placeholder='Email']");
    const phoneNumberInput = document.querySelector("input[placeholder='Номер телефона']");

    paymentButton.addEventListener("click", function(event) {
        event.preventDefault(); 

        const cardNumber = cardNumberInput.value.trim();
        const expiryDate = expiryDateInput.value.trim();
        const cvv = cvvInput.value.trim();
        const email = emailInput.value.trim();
        const phoneNumber = phoneNumberInput.value.trim();

        if (cardNumber === "" || expiryDate === "" || cvv === "" || email === "" || phoneNumber === "") {
            alert("Пожалуйста, заполните все поля.");
        } else {
            console.log("Номер карты:", cardNumber);
            console.log("Срок действия:", expiryDate);
            console.log("CVV:", cvv);
            console.log("Email:", email);
            console.log("Номер телефона:", phoneNumber);
            alert("Оплата прошла успешно!");
            window.location.href = 'my_courses.html';
        }
    });
});
