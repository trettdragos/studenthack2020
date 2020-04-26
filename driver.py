import os
import requests
from serial import Serial
import time

URL_JOKE = "http://138.197.73.249:80/joke"
URL_COMM = "http://138.197.73.249:80/robot/getcommand"
port = '/dev/ttyACM0'
ard = Serial(port,9600,timeout=5)

def say_joke():	
	r = requests.get(url=URL_JOKE)
	data = r.json()
	print(data)
	os.system('espeak -w audio.wav -ven-us+f4 -s150 "'+data['Title']+ ' ' + data['Description'] +'"')
	os.system('omxplayer -o local --vol -1500 audio.wav')
#	os.system('espeak -ven-us+f4 -s170 "'+data['Title']+'"')
#	os.system('espeak -ven-us+f4 -s170 "'+data['Description']+'"')

def relay_command(command):
	print("send command")
	ard.write(command.encode())
	# time.sleep(1)

while(1):
	# relay_command("w")
	r = requests.get(url=URL_COMM)
	print(r)
	data = r.json()
	if(data['Type'] == "null"):
		print("no response")
		continue
	else:
		print(data)
		if(data['Type'] == "joke"):
			say_joke();
		elif(data['Type'] == "move"):
			relay_command(data['Direction'])
		elif(data['Type'] == "strange"):
			os.system('espeak -w audio.wav -ven-us+f4 -s150 "'+data['Direction']+'"')
			os.system('omxplayer -o local --vol -1500 audio.wav')

