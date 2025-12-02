from flask import Flask
from flask_bcrypt import Bcrypt
import sqlite3

app = Flask(__name__)
bcrypt = Bcrypt(app)

password = "admin"
hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

conn = sqlite3.connect('my_portal.db')
cursor = conn.cursor()

# Check if user exists
cursor.execute("SELECT * FROM teacher WHERE email = 'admin@admin.com'")
if cursor.fetchone():
    print("User already exists")
else:
    cursor.execute("""
        INSERT INTO teacher (first_name, last_name, date_of_birth, email, password, email_verified, profile_avatar)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    """, ('Admin', 'User', '2000-01-01', 'admin@admin.com', hashed_password, 1, 'https://api.dicebear.com/7.x/adventurer/svg?seed=Admin'))
    conn.commit()
    print("Admin user created")

conn.close()
