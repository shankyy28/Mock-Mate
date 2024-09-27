import os
from flask import Flask, jsonify, request, session
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from dotenv import load_dotenv
from dbclient import connect_client

load_dotenv()

db_client = connect_client()

app = Flask(__name__)
bcrypt = Bcrypt(app)
CORS(app)

app.secret_key = os.urandom(24)

@app.route("/")
def index():
    return jsonify({"Title": "Mock Mate",
                    "Date Created": "01-09-2024"})

@app.route('/login', methods = ['POST', 'GET'])
def login():
    print({"call" : "/login"})
    """username = "shanky28"
    password = "1234567890"
    full_name = "Shashank Dimri"
    email_id = "shashankdimri28@gmail.com"
    phone_number = 7818004964
    response = (db_client.table("login_data").insert({"username": username,
                                         "password": password,
                                         "full_name": full_name,
                                         "email_id": email_id,
                                         "phone_number": phone_number}).execute())
    if hasattr(response, 'error') and response.error:
        error_message = str(response.error)
        print(error_message)
    print(response)"""
    data = request.json
    username = data.get("username")
    password = data.get("password")
    print(data)
    
    response = (db_client.table("login_data").select("*").eq("username", username).execute())

    if (len(response.data) == 0):
        return jsonify({"error": "User does not exist"}), 404
    
    try:
        response = db_client.table("login_data").select("password").eq("username", username).execute()
        pass_check = response.data[0]['password']
        if (bcrypt.check_password_hash(pass_check, password)):
            session["username"] = username
            return jsonify({"login": "true"}), 200
        else:
            return jsonify({"error": "password incorrect"}), 400
    except Exception as e:
        return jsonify({"error" : "Query error"}), 500

@app.route("/signup", methods = ['POST'])
def signup():
    print({"call" : "/signup"})
    data = request.json
    username = data.get("username")
    password = data.get("password")
    full_name = data.get("fullname")
    email_id = data.get("email")
    print(data)

    try:
        user_check = db_client.table("login_data").select("*").eq("username", username).execute()
    except Exception as e:
        return jsonify({"error" : "user_check query error"}), 500

    if (len(user_check.data) > 0):
        return jsonify({"error": "User already exists"}), 409

    hashed_password = bcrypt.generate_password_hash(password = password)
    hashed_password_str = hashed_password.decode('utf-8')  # stringify

    try:
        response = (db_client.table("login_data").insert({"username": username,
                                            "password": hashed_password_str,
                                            "full_name": full_name,
                                            "email_id": email_id}).execute())
        return jsonify({"register": "true"}), 200
    except Exception as e:
        return jsonify({"error" : "insert query error"}), 500

@app.route("/dashboard")
def dashboard():
    return jsonify({"call": "/dashboard"})

if __name__ == "__main__":
    app.run(debug = True)