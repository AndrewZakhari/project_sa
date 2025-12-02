# My Portal

A Flask-based web application for managing student and teacher interactions, including subject management, grades, lectures, and chat.

## Prerequisites

- Python 3.11 or higher
- pip (Python package installer)

## Installation & Setup

1.  **Clone the repository** (if you haven't already):
    ```bash
    git clone git@github.com:AndrewZakhari/Project_SA.git
    cd my-portal
    ```

2.  **Create and activate a virtual environment** (recommended):
    ```bash
    python -m venv venv
    # On Linux/Mac:
    source venv/bin/activate
    # On Windows:
    venv\Scripts\activate
    ```

3.  **Install dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

4.  **Environment Configuration**:
    The application uses a `.env` file for email configuration. A default `.env` file has been created for you.
    
    To use real email functionality (for password resets and registration verification), update the `.env` file with valid SMTP credentials.
    
    **Current `.env` example:**
    ```env
    MAIL_SERVER=smtp.gmail.com
    MAIL_PORT=465
    MAIL_USERNAME=your_email@gmail.com
    MAIL_PASSWORD=your_app_password
    MAIL_USE_TLS=False
    MAIL_USE_SSL=True
    ```
    
    *Note: If invalid credentials are used, the application runs in "Mock Mode", printing verification codes to the server console/logs instead of sending emails.*

5.  **Initialize the Database**:
    The project is currently configured to use **SQLite**. Run the initialization script to create the database file (`my_portal.db`) and tables:
    ```bash
    python init_db.py
    ```

6.  **Create Admin User** (Optional):
    To create a default teacher account with admin privileges:
    ```bash
    python create_admin.py
    ```
    **Default Credentials:**
    - Email: `admin@admin.com`
    - Password: `admin`

## Running the Application

Start the Flask development server:

```bash
python main.py
```

The application will be accessible at `http://127.0.0.1:5000`.

## Features

- **User Roles:** Student and Teacher accounts.
- **Authentication:** Login, Register, Password Reset (with email verification).
- **Subjects:** Teachers can create subjects; Students can join via code.
- **Lectures & Materials:** Upload/view lectures, PDFs, and videos.
- **Grades:** Teachers can manage grades; Students can view them.
- **Chat:** Real-time chat functionality within subjects.
- **Quizzes:** Create and take quizzes.

## Tech Stack

- **Backend:** Flask (Python)
- **Database:** SQLite (migrated from MySQL for portability)
- **Frontend:** HTML, CSS, JavaScript, Bootstrap
- **ORM/DB Access:** Raw SQL via `sqlite3` (wrapped to mimic `flask_mysqldb`)
