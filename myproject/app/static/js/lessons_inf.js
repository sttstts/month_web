function showLessonContent(lessonTitle, lessonContent) {
    var titleElement = document.querySelector('.lesson-title');
    var contentElement = document.querySelector('.lesson-content');

    titleElement.textContent = lessonTitle;
    contentElement.textContent = lessonContent;
}

var lessonCards = document.querySelectorAll('.lesson-card');
lessonCards.forEach(function(card) {
    card.addEventListener('click', function() {
        var lessonTitle = card.querySelector('.lesson-title').textContent;
        var lessonContent = card.querySelector('.lesson-description').textContent;

        showLessonContent(lessonTitle, lessonContent);
    });
});
