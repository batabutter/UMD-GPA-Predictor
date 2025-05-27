from flask import Flask
from api import Api_Calls
from flask_cors import CORS


app = Flask(__name__)
#Json data

@app.route("/coursedata")
def coursedata():
    return Api_Calls.get_course_name("ENES100")

if __name__ == "__main__":
    app.run(debug=True)
    