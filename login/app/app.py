from flask import Flask, jsonify, request
from flask_bcrypt import Bcrypt
from dotenv import load_dotenv
from dbclient import connect_client

load_dotenv()

db_client = connect_client()

app = Flask(__name__)
bcrypt = Bcrypt(app)

@app.route("/")
def index():
    return jsonify({"Title": "Mock Mate",
                    "Date Created": "01-09-2024"})

@app.route('/login', methods = ['POST', 'GET'])
def login():
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
    username = request.json["username"]
    password = request.json["password"]
    
    response = (db_client.table("login_data").select("*").eq("username", username).execute())

    if (response is None):
        return jsonify({"error": "User does not exist"})
    
    pass_check = db_client.table("login_data").select("password").eq("username", username).execute()
    
    if (bcrypt.check_password_hash(pass_check, password)):
        return jsonify({"login": "true"})
    else:
        return jsonify({"error": "password incorrect"})

@app.route("/register")
def register():
    username = request.json["username"]
    password = request.json["password"]
    full_name = request.json["full_name"]
    email_id = request.json["email_id"]

    user_check = (db_client.table("login_data").select("*").eq("username", username).execute())

    if (user_check is not None):
        return jsonify({"error": "User already exists"})
    
    hashed_password = bcrypt.generate_password_hash(password = password)

    response = (db_client.table("login_data").insert({"username": username,
                                         "password": hashed_password,
                                         "full_name": full_name,
                                         "email_id": email_id}).execute())
    if hasattr(response, 'error') and response.error:
        error_message = str(response.error)
        return jsonify({"error": error_message})
    else:
        return jsonify({"register": "true"})

@app.route("/dashboard")
def dashboard():
    return jsonify({"call": "/dashboard"})

if __name__ == "__main__":
    app.run(debug = True)