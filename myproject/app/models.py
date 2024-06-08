from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    # Остальные поля пользователя

class Course(db.Model):
    __tablename__ = 'courses'
    id = db.Column(db.Integer, primary_key=True)
    course_name = db.Column(db.String(80), nullable=False)
    duration = db.Column(db.String(80), nullable=False)
    lesson_count = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    teacher_id = db.Column(db.Integer, db.ForeignKey('teachers.id'), nullable=False)
    # Остальные поля курса

class UserCourse(db.Model):
    __tablename__ = 'user_courses'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('courses.id'), nullable=False)
    level = db.Column(db.Enum('beginner', 'intermediate', 'advanced'), nullable=False)
    user = db.relationship('User', backref=db.backref('user_courses', lazy=True))
    course = db.relationship('Course', backref=db.backref('user_courses', lazy=True))
    # Дополнительные поля для связи пользователя и курса
