import requests
from flask import jsonify
from course_operations import compute_semester_average, format_year 

base_url = 'https://planetterp.com/api/v1'

class Api_Calls:
    @staticmethod
    def Get_Course_Info(name):
        url = f'{base_url}/course'
        params = {"name": name}
        response = requests.get(url, params=params)
        
        if response.status_code == 200:
            print('Course data aquired successfully')
        else:
            print(f'Error obtaining course info: {name}. Error code {response}')
            
        data = response.json()
        return data
    
    @staticmethod
    def Get_Course_Grade_Distribution(name):
        url = f'{base_url}/grades'
        params = {"course": name}
        response = requests.get(url, params=params)
        
        if response.status_code == 200:
            print('Course data aquired successfully')
        else:
            print(f'Error obtaining grade dis: {name}. Error code {response}')
            
        data = response.json()
        return data
    
    @staticmethod
    def Course_Section_Information(course_name):
        course_dis = Api_Calls.Get_Course_Grade_Distribution(course_name)
        grade_dis = []
        
        for key in course_dis:
            info = {
                "A": 0, "A+": 0, "A-": 0,
                "B": 0, "B+": 0, "B-": 0,
                "C": 0, "C+": 0, "C-": 0,
                "D": 0, "D+": 0, "D-": 0,
                "F": 0, "Other": 0, "W": 0,
                "course": "", "professor": "",
                "section": "", "semester": "",
                "formatted_name": ""
            }
            formatted_year = format_year(key["semester"])
            
            formatted_info = (
            formatted_year + ", " 
            + key["section"] + " - " + str(key["professor"])
            )
            
            for value in key:
                info[value] = key[value]
                info["formatted_name"] = formatted_info
            
            grade_dis.append(info)
        
        return grade_dis
            
    
    @staticmethod
    def Get_Total_Course_Grade_Distribution(course_name):
        course_dis = Api_Calls.Get_Course_Grade_Distribution(course_name)
        
        cumulative_grades = {}
        
        excluded_keys = ["Other", "course", "professor", "section", "semester"]

        for key in course_dis:
            
            for value in key:
                if value not in excluded_keys:
                    if value not in cumulative_grades:
                        cumulative_grades[value] = 0
                    cumulative_grades[value] += key[value]
                    
        grade_arr = []
        for grade, count in cumulative_grades.items():
            grade_arr.append({"grade": grade, "count": count})
        
        return grade_arr
    
    @staticmethod
    def Search_List_Result(name):

        url = f'{base_url}/search'
        params = {"query": name}
        response = requests.get(url, params=params)
            
        if response.status_code == 200:
            print('Course data aquired successfully')
        else:
            print(f'Error obtaining grade dis: {name}. Error code {response}')
                
        data = response.json()
        return data
    
    @staticmethod
    def Course_GPA_Trend(course_name):

        course_dis = Api_Calls.Get_Course_Grade_Distribution(course_name)
        semester_grade_dis = {}
        semester_avgs = {}
        final_averages = []
        
        for key in course_dis:
            formatted_year = format_year(key["semester"])

            if formatted_year not in semester_grade_dis:
                semester_grade_dis[formatted_year] = {}
                
            for value in key:
                excluded_keys = ["Other", "course", "professor", "section", "semester"]
                if value not in excluded_keys:
                    if value not in semester_grade_dis[formatted_year]:
                        semester_grade_dis[formatted_year][value] = 0
                    semester_grade_dis[formatted_year][value] += key[value]
                    
            for semester in semester_grade_dis:
                avg = compute_semester_average(semester_grade_dis[semester])
                semester_avgs[semester] = avg
                
            final_averages = [
                {"semester": semester, "average": average}
                for semester, average in semester_avgs.items()
            ]
            final_averages = []
            for semester, average in semester_avgs.items():
                final_averages.append({"semester": semester, "average": average})
            
            
        return final_averages
