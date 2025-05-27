import requests

base_url = 'https://api.umd.io/v0/'
res = requests.post(base_url)

class Api_Calls:
    @staticmethod
    def get_course_name(name):
        url = f'{base_url}/courses/{name}'
        response = requests.get(url)
    
        if response.status_code == 200:
            print('Course data aquired successfully')
        else:
            print(f'Error obtaining data for {name}. Error code {response}')
            
        data = response.json()
        return data
        
        
        
        
    