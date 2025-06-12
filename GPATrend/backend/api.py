import requests

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
        
        
        
    