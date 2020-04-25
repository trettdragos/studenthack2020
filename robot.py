import os
import requests
URL = "http://localhost:5001/joke"
PARAMS = {}
r = requests.get(url=URL)
data = r.json()
print(data)
os.system('espeak "'+data['Title']+'"')
os.system('espeak "'+data['Description']+'"')