document.addEventListener("DOMContentLoaded", function() {
    var urlParams = new URLSearchParams(window.location.search);
    var course_id = urlParams.get('course_id');

    function updateCourseInfo(course_id) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "/reg_courses?course_id=" + course_id, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                document.getElementById("course-info").innerHTML = xhr.responseText;
            }
        };
        xhr.send();
    }

    function saveSelectionAndRedirect() {
    const course = document.getElementById('course-select').value;
    const level = document.querySelector('input[name="language-level"]:checked').value;

    localStorage.setItem('selectedCourse', course);
    localStorage.setItem('selectedLevel', level);

    window.location.href = '/payment';
}

    const paymentButton = document.querySelector(".payment-button");
    paymentButton.addEventListener("click", saveSelectionAndRedirect);

    updateCourseInfo(course_id);
});
