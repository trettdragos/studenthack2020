import os
import requests
URL = "http://138.197.73.249:80/joke"
PARAMS = {}
r = requests.get(url=URL)
data = r.json()
print(data)
os.system('espeak "'+data['Title']+'"')
os.system('espeak "'+data['Description']+'"')
