from flask import Flask
from api import Api_Calls
from flask_cors import CORS


app = Flask(__name__)
#Json data

@app.route("/course_info/<course_name>")
def coursedata(course_name):
    return Api_Calls.Get_Course_Info(course_name)

@app.route("/course_grade_dis/<course_name>")
def coursedis(course_name):
    return Api_Calls.Get_Course_Grade_Distribution(course_name)

@app.route("/course_search/<course_name>")
def coursesearch(course_name):
    return Api_Calls.Search_List_Result(course_name)

if __name__ == "__main__":
    app.run(debug=True)
    