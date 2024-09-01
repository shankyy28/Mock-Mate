from flask import Flask, jsonify, render_template
from dotenv import load_dotenv
from dbclient import connect_client

load_dotenv()

db_client = connect_client()

app = Flask(__name__)

@app.route("/")
def index():
    return jsonify({"Title": "Mock Mate",
                    "Date Created": "01-09-2024"})

@app.route('/login', methods = ['POST', 'GET'])
def login():
    # username = "shanky28"
    # password = "1234567890"
    # full_name = "Shashank Dimri"
    # email_id = "shashankdimri28@gmail.com"
    # phone_number = 7818004964
    # response = (db_client.table("login_data").insert({"username": username,
    #                                      "password": password,
    #                                      "full_name": full_name,
    #                                      "email_id": email_id,
    #                                      "phone_number": phone_number}).execute())
    # if hasattr(response, 'error') and response.error:
    #     error_message = str(response.error)
    #     print(error_message)
    # print(response)
    return render_template("login.html")

@app.route("/register")
def register():
    return render_template("register.html")

if __name__ == "__main__":
    app.run(debug = True)