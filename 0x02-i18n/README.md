# 0x02. i18n

## Project Overview

This project focuses on internationalization (i18n) using Flask and Babel to support multiple languages in a web application. We will set up a basic Flask app and progressively enhance it with localization features, including language selection based on URL parameters, user settings, or request headers, and timezone localization.

## Technologies Used

- Python 3.7
- Flask
- Flask-Babel
- pytz

## Files in This Repository

- `0-app.py`: Basic Flask app with a single route.
- `1-app.py`: Flask app with Babel setup.
- `2-app.py`: Flask app determining locale from request headers.
- `3-app.py`: Flask app with parameterized templates.
- `4-app.py`: Flask app with locale forced via URL parameter.
- `5-app.py`: Flask app simulating user login.
- `6-app.py`: Flask app using user-preferred locale.
- `7-app.py`: Flask app inferring appropriate timezone.
- `app.py`: Advanced task for displaying the current time.
- `templates/`: Directory containing HTML templates.
- `translations/`: Directory containing localization files.
- `babel.cfg`: Configuration file for Babel translation extraction.

## How to Run the Project

1. Install required dependencies:
    ```sh
    pip3 install flask flask_babel==2.0.0 pytz
    ```
2. Run each Python file to test specific tasks.

### Installation Instructions

- Ensure Python 3.7 and pip are installed.
- Install Flask and Flask-Babel as described in the guide.

## Compilation

All Python scripts are executable and must be run directly using the Python interpreter.

## Usage

To test each functionality, run the corresponding Python script and visit `http://127.0.0.1:5000` in a web browser.
