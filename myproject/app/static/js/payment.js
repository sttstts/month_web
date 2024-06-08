document.addEventListener("DOMContentLoaded", function() {
    const paymentButton = document.querySelector(".payment-button");
    const cardNumberInput = document.querySelector("input[placeholder='Номер карты']");
    const expiryDateInput = document.querySelector("input[placeholder='Срок действия']");
    const cvvInput = document.querySelector("input[placeholder='CVV']");
    const emailInput = document.querySelector("input[placeholder='Email']");
    const phoneNumberInput = document.querySelector("input[placeholder='Номер телефона']");

    const paymentUrl = document.getElementById("payment-url").value;

    const selectedCourseElement = document.getElementById("selected-course");
    const courseDurationElement = document.getElementById("course-duration");
    const courseLessonsElement = document.getElementById("course-lessons");
    const selectedLevelElement = document.getElementById("selected-level");
    const courseCostElement = document.getElementById("course-cost");

    const hiddenSelectedCourseInput = document.getElementById("hidden-selected-course-id");
    const hiddenSelectedLevelInput = document.getElementById("hidden-selected-level");

    const selectedCourse = localStorage.getItem("selectedCourse");
    const selectedLevel = localStorage.getItem("selectedLevel");

    function getCourseDetails(course, level) {
        let details = {
            id: 1,
            duration: "",
            lessons: "",
            cost: ""
        };

        switch (course) {
            case "Английский язык":
                details.id = 1;
                details.duration = "2 года 3 месяца";
                details.lessons = "180";
                details.cost = (level === "advanced") ? "180 000" : (level === "intermediate") ? "150 000" : "129 000";
                break;
            case "Французский язык":
                details.id = 2;
                details.duration = "1 год 6 месяцев";
                details.lessons = "109";
                details.cost = (level === "advanced") ? "120 000" : (level === "intermediate") ? "100 000" : "80 000";
                break;
            case "Испанский язык":
                details.id = 3;
                details.duration = "1 год 8 месяцев";
                details.lessons = "145";
                details.cost = (level === "advanced") ? "90 000" : (level === "intermediate") ? "82 500" : "75 000";
                break;
            default:
                break;
        }

        return details;
    }

    if (selectedCourse && selectedLevel) {
        const courseDetails = getCourseDetails(selectedCourse, selectedLevel);

        selectedCourseElement.textContent = selectedCourse;
        courseDurationElement.textContent = courseDetails.duration;
        courseLessonsElement.textContent = courseDetails.lessons;
        selectedLevelElement.textContent = selectedLevel === "advanced" ? "Продвинутый" : selectedLevel === "intermediate" ? "Средний" : "Лёгкий";
        courseCostElement.textContent = courseDetails.cost + " рублей";

        hiddenSelectedCourseInput.value = courseDetails.id;
        hiddenSelectedLevelInput.value = selectedLevel;
    }

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
            const emailPattern = /.+@.+/;
            const phonePattern = /^\d+$/;

            if (!emailPattern.test(email)) {
                alert("Пожалуйста, введите правильный email.");
                return;
            }

            if (!phonePattern.test(phoneNumber)) {
                alert("Пожалуйста, введите правильный номер телефона.");
                return;
            }

            const formData = new FormData();
            formData.append("card_number", cardNumber);
            formData.append("expiry_date", expiryDate);
            formData.append("cvv", cvv);
            formData.append("email", email);
            formData.append("phone_number", phoneNumber);
            formData.append("selected_course_id", hiddenSelectedCourseInput.value);
            formData.append("selected_level", hiddenSelectedLevelInput.value);

            fetch(paymentUrl, {
                method: "POST",
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert("Оплата прошла успешно!");
                    window.location.href = paymentButton.dataset.myCoursesUrl;
                } else {
                    alert("Ошибка при обработке платежа: " + data.error);
                }
            })
            .catch(error => {
                console.error("Ошибка:", error);
                alert("Произошла ошибка при отправке данных. Пожалуйста, попробуйте снова.");
            });
        }
    });
});
