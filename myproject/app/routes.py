from app import app, mysql
from flask import render_template, request, redirect, url_for, flash, session, jsonify
from datetime import datetime, timedelta

def has_user_courses():
    try:
        cur = mysql.connection.cursor()
        user_id = session.get('user_id')
        cur.execute("SELECT COUNT(*) FROM user_courses WHERE user_id = %s", (user_id,))
        count = cur.fetchone()[0]
        cur.close()
        print(count)
        return count > 0
    except Exception as e:
        print(f"Ошибка при проверке наличия курсов у пользователя: {e}")
        return False

@app.route('/')
def authorization():
    return render_template('authorization.html')

@app.route('/authorize', methods=['POST'])
def authorize():
    email = request.form['email']
    password = request.form['password']

    try:
        cur = mysql.connection.cursor()
        cur.execute("SELECT id FROM users WHERE email = %s AND password = %s", (email, password))
        user_id = cur.fetchone()
        cur.close()

        if user_id:
            session['user_id'] = user_id[0]
            return redirect(url_for('home'))
        else:
            print("User not found or password incorrect")
            return render_template('authorization.html', error="Неверный email или пароль")
    except Exception as e:
        print(f"Database error: {e}")
        return render_template('authorization.html', error="Ошибка базы данных")

@app.route('/registration')
def registration():
    return render_template('registration.html')

@app.route('/register', methods=['POST'])
def register():
    email = request.form['email']
    password = request.form['password']
    confirm_password = request.form['confirm_password']

    if password != confirm_password:
        return "Пароль и подтверждение пароля не совпадают"

    try:
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM users WHERE email = %s", (email,))
        user = cur.fetchone()

        if user:
            return "Пользователь с таким email уже существует"
        else:
            cur.execute("INSERT INTO users (email, password) VALUES (%s, %s)", (email, password))
            mysql.connection.commit()
            cur.close()

            return redirect(url_for('authorization'))
    except Exception as e:
        return f"Ошибка базы данных: {e}"

@app.route('/home')
def home():
    return render_template('home.html')

@app.route('/courses')
def courses():
    return render_template('courses.html')

@app.route('/aboutUs')
def about_us():
    return render_template('aboutUs.html')

@app.route('/contacts')
def contacts():
    return render_template('contacts.html')

@app.route('/lesson_info/<int:lesson_id>')
def lesson_info(lesson_id):
    lesson = get_lesson_by_id(lesson_id)
    if lesson:
        return render_template('lessons_inf.html', lesson=lesson)
    else:
        return "Урок не найден"

def get_lesson_by_id(lesson_id):
    try:
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM lessons WHERE id = %s", (lesson_id,))
        lesson = cur.fetchone()
        cur.close()
        return lesson
    except Exception as e:
        print(f"Ошибка при получении информации об уроке из базы данных: {e}")
        return None

@app.route('/lessons/<int:course_id>')
def lessons(course_id):
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM lessons WHERE course_id = %s", [course_id])
    column_names = [i[0] for i in cur.description]
    lessons = [dict(zip(column_names, row)) for row in cur.fetchall()]
    return render_template('lessons.html', lessons=lessons)

def get_lessons_by_course_id(course_id):
    try:
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM lessons WHERE course_id = %s", (course_id,))
        lessons = cur.fetchall()
        cur.close()
        return lessons
    except Exception as e:
        print(f"Ошибка при получении уроков из базы данных: {e}")
        return None

def translate_level(level):
    if level == 'beginner':
        return 'Начинающий'
    elif level == 'intermediate':
        return 'Средний'
    elif level == 'advanced':
        return 'Продвинутый'
    else:
        return level

@app.route('/my_courses')
def my_courses():
    has_courses = has_user_courses()
    if has_courses:
        user_id = session.get('user_id')
        user_courses = get_user_courses(user_id)
        for course in user_courses:
            course[6] = translate_level(course[6])
        return render_template('my_courses.html', has_courses=has_courses, user_courses=user_courses, translate_level=translate_level, next_lesson_date=next_lesson_date)
    else:
        return render_template('my_courses.html', has_courses=has_courses)

def next_lesson_date():
    current_date = datetime.now().date()
    next_lesson = current_date + timedelta(days=7)
    return next_lesson.strftime('%Y-%m-%d')

def get_user_courses(user_id):
    try:
        cur = mysql.connection.cursor()
        cur.execute("SELECT courses.*, user_courses.level FROM courses JOIN user_courses ON courses.id = user_courses.course_id WHERE user_courses.user_id = %s", (user_id,))
        user_courses = cur.fetchall()
        cur.close()
        user_courses = [list(course) for course in user_courses]
        return user_courses
    except Exception as e:
        print(f"Ошибка при получении курсов пользователя из базы данных: {e}")
        return None

@app.route('/send_message', methods=['POST'])
def send_message():
    email = request.form['email']
    message = request.form['message']
    user_id = get_user_id_by_email(email)

    print(f"Email: {email}, Message: {message}, User ID: {user_id}")

    try:
        cur = mysql.connection.cursor()
        cur.execute('''INSERT INTO messages (user_id, message) VALUES (%s, %s)''', (user_id, message))
        mysql.connection.commit()
        cur.close()
        return redirect(url_for('contacts'))
    except Exception as e:
        flash('Ошибка при отправке сообщения', 'error')
        return redirect(url_for('contacts'))

def get_user_id_by_email(email):
    try:
        cur = mysql.connection.cursor()
        cur.execute("SELECT id FROM users WHERE email = %s", (email,))
        user = cur.fetchone()
        cur.close()
        if user:
            user_id = user[0]
            print(f"User ID found: {user_id}")
            return user_id
        else:
            print("User ID not found")
            return None
    except Exception as e:
        print(f"Ошибка при получении ID пользователя: {e}")
        return None

@app.route('/reg_courses')
def reg_courses():
    course_id = request.args.get('course_id')
    course = get_course_by_id(course_id)
    return render_template('reg_courses.html', course=course)

def get_course_by_id(course_id):
    try:
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM courses WHERE id = %s", (course_id,))
        course = cur.fetchone()
        cur.close()
        return course
    except Exception as e:
        print(f"Ошибка при получении информации о курсе из базы данных: {e}")
        return None

@app.route('/payment')
def show_payment_page():
    return render_template('payment.html')

@app.route('/process_payment', methods=['POST'])
def process_payment():
    try:
        card_number = request.form['card_number']
        expiry_date = request.form['expiry_date']
        cvv = request.form['cvv']
        email = request.form['email']
        phone_number = request.form['phone_number']
        selected_course_id = request.form['selected_course_id']
        selected_level = request.form['selected_level']

        user_id = session['user_id']
        try:
            cur = mysql.connection.cursor()
            cur.execute("INSERT INTO user_courses (user_id, course_id, level) VALUES (%s, %s, %s)", (user_id, selected_course_id, selected_level))
            mysql.connection.commit()
            cur.close()
            print("Успешно добавлено в таблицу user_courses")
        except Exception as e:
            print(f"Ошибка при добавлении в таблицу user_courses: {e}")

        return jsonify({'success': True})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
