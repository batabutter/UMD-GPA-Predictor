from backend.api import Api_Calls

data = Api_Calls.get_course_name("ENES100")

print('Printing data for ENES100')

if (data):
    print(data['department'])
    
    