from flask import Flask
from api import Api_Calls

app = Flask(__name__)
#Json data

@app.route("/course_info/<course_name>")
def coursedata(course_name):
    return Api_Calls.Get_Course_Info(course_name)

@app.route("/course_search/<course_name>")
def coursesearch(course_name):
    return Api_Calls.Search_List_Result(course_name)

@app.route("/course_gpa_trend/<course_name>")
def course_averages(course_name):
    return Api_Calls.Course_GPA_Trend(course_name)

@app.route("/total_course_grade_dis/<course_name>")
def total_course_dis(course_name):
    return Api_Calls.Get_Total_Course_Grade_Distribution(course_name)

@app.route("/total_section_distribution/<course_name>")
def total_section_dis(course_name):
    return Api_Calls.Course_Section_Information(course_name)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
    