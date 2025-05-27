from flask import Flask
from api import Api_Calls
from flask_cors import CORS


app = Flask(__name__)
#Json data

@app.route("/course_info")
def coursedata():
    return Api_Calls.Get_Course_Info("CMSC216")

@app.route("/course_grade_dis")
def coursedis():
    return Api_Calls.Get_Course_Grade_Distribution("CMSC216")

if __name__ == "__main__":
    app.run(debug=True)
    