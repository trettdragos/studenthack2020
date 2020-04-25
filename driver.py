import os
import requests
from serial import Serial
import time
import eventlet
eventlet.monkey_patch()

URL_JOKE = "http://localhost:5002/joke"
URL_COMM = "http://localhost:5002/robot/getcommand"
port = '/dev/ttyACM0'
ard = Serial(port,9600,timeout=5)

def say_joke():	
	r = requests.get(url=URL_JOKE)
	data = r.json()
	print(data)
	os.system('espeak -ven-us+f4 -s170 "'+data['Title']+'"')
	os.system('espeak -ven-us+f4 -s170 "'+data['Description']+'"')

def relay_command(command):
	print("send command")
	ard.write(command.encode())
	time.sleep(1)


while(1):
	# relay_command("w")
	try:
		with eventlet.Timeout(1):
			r = requests.get(url=URL_COMM)
			data = r.json()
			if(data == None):
				print("no response")
			else:
				if(data['Type'] == "joke"):
					say_joke();
				if(data['Type'] == "move"):
					relay_command(data['Direction'])
	except:
		print("no new command")