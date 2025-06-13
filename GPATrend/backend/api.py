import requests
from flask import jsonify
from grade_calculation import compute_semester_average 

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
            formatted_year = key["semester"][0:4]
            
            
            if (key["semester"][len(key["semester"]) - 1] == "1"):
                formatted_year = "Fall " + formatted_year
            else:
                formatted_year = "Spring " + formatted_year
                
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
            
        return final_averages
        
        
    