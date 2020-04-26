#include <Servo.h>

int incomingByte = 0; // for incoming serial data
unsigned int MOTOR2_PIN1 = 6;
unsigned int MOTOR2_PIN2 = 11;
unsigned int MOTOR1_PIN1 = 3;
unsigned int MOTOR1_PIN2 = 5;

Servo myservo;
int minPos = 5;
int maxPos = 160;

void setup() {
    myservo.attach(10);
    openClaw();
    closeClaw();
  Serial.begin(9600); // opens serial port, sets data rate to 9600 bps
}

void loop() {
  if (Serial.available() > 0) {
    incomingByte = Serial.read();
    if(incomingByte==119){
      Serial.println("go forth");
      goForth();
      delay(600);
    }else if(incomingByte==115){
      Serial.println("go back");
      goBack();
      delay(600);
    }else if(incomingByte==97){
      Serial.println("go left");
      goLeft();
      delay(600);
    }else if(incomingByte==100){
      Serial.println("go right");
      goRight();
      delay(600);
    }else if(incomingByte==103){
      Serial.println("grip");
      closeClaw();
    }else if(incomingByte==114){
      Serial.println("release");
      openClaw();
    }
    go(0, 0);
//    Serial.print("I received: ");
//    Serial.println(incomingByte, DEC);
  }
}

void closeClaw(){
  myservo.write(minPos);
  delay(700);
}

void openClaw(){
  myservo.write(maxPos);
  delay(700);
}

void pin1m1(){
  analogWrite(MOTOR1_PIN1, 0);
  analogWrite(MOTOR1_PIN2, 0);
  analogWrite(MOTOR2_PIN1, 250);
  analogWrite(MOTOR2_PIN2, 0);  
}

void goForth(){
  analogWrite(MOTOR1_PIN1, 0);
  analogWrite(MOTOR1_PIN2, 250);
  analogWrite(MOTOR2_PIN1, 0);
  analogWrite(MOTOR2_PIN2, 250);
}

void goBack(){
  analogWrite(MOTOR1_PIN1, 250);
  analogWrite(MOTOR1_PIN2, 0);
  analogWrite(MOTOR2_PIN1, 250);
  analogWrite(MOTOR2_PIN2, 0);
}

void goLeft(){
  analogWrite(MOTOR1_PIN1, 250);
  analogWrite(MOTOR1_PIN2, 0);
  analogWrite(MOTOR2_PIN1, 0);
  analogWrite(MOTOR2_PIN2, 250);
}

void goRight(){
  analogWrite(MOTOR1_PIN1, 0);
  analogWrite(MOTOR1_PIN2, 250);
  analogWrite(MOTOR2_PIN1, 250);
  analogWrite(MOTOR2_PIN2, 0);
}

void go(int speedLeft, int speedRight)
{
  if (speedLeft > 0)
  {
    analogWrite(MOTOR1_PIN1, speedLeft);
    analogWrite(MOTOR1_PIN2, 0);
  }
  else
  {
    analogWrite(MOTOR1_PIN1, 0);
    analogWrite(MOTOR1_PIN2, -speedLeft);
  }

  if (speedRight > 0)
  {
    analogWrite(MOTOR2_PIN1, speedRight);
    analogWrite(MOTOR2_PIN2, 0);
  }
  else
  {
    analogWrite(MOTOR2_PIN1, 0);
    analogWrite(MOTOR2_PIN2, -speedRight);
  }
}
