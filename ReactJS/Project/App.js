import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {AntDesign, FontAwesome5, FontAwesome} from '@expo/vector-icons';

const ApiServer = "http://138.197.73.249:80/app/putcommand"

async function sendDirection(params) {
  const data ={ "Direction": params, "Type": "move"}
  console.log(data);
  try {
    let response = await fetch(ApiServer, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    console.log("succes");
  } catch(error) {
    console.log("Error is: " + error);
  }
}

async function sayJoke() {
  const data ={ "Type": "joke"}
  console.log(data);
  try {
    let response = await fetch(ApiServer, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    console.log("succes");
  } catch(error) {
    console.log("Error is: " + error);
  }
}

export default class App extends Component{

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.upContainer}>
          <TouchableOpacity style={styles.button} onPress={() => sendDirection("w").then()}>
            <AntDesign name="caretup" size={32} color="#DCBE24" />
          </TouchableOpacity>
        </View>
        <View style={styles.centerContainer}>
          <View style={styles.middleZone}>
            <TouchableOpacity style={styles.button} onPress={() => sendDirection("a")}>
              <AntDesign name="caretleft" size={32} color="#DCBE24" />
            </TouchableOpacity>
          </View>
          <View style={styles.middleZone}>
            <TouchableOpacity style={styles.midButton} onPress={() => sayJoke()}>
              <FontAwesome5 name="laugh-beam" size={32} color="#DCBE24" />
              <Text style={{color:"#DCBE24", fontWeight:"bold"}}>LAUGH!!</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.middleZone}>
            <TouchableOpacity style={styles.button} onPress={() => sendDirection("d")}>
              <AntDesign name="caretright" size={32} color="#DCBE24" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.downContainer}>
          <TouchableOpacity style={styles.button} onPress={() => sendDirection("s")}>
            <AntDesign name="caretdown" size={32} color="#DCBE24" />
          </TouchableOpacity>
        </View>
        <View style={styles.specialContainer}>
          <View style={styles.grabContainer}>
            <TouchableOpacity style={styles.midButton} onPress={() => sendDirection("g")}>
              <FontAwesome name="hand-grab-o" size={32} color="#DCBE24" />
              <Text style={{color:"#DCBE24", fontWeight:"bold"}}>GRAB</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.releaseContainer}>
            <TouchableOpacity style={styles.midButton} onPress={() => sendDirection("r")}>
              <FontAwesome name="hand-paper-o" size={32} color="#DCBE24" />
              <Text style={{color:"#DCBE24", fontWeight:"bold"}}>RELEASE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C689C4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  upContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  downContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  specialContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    paddingBottom: 10
  },
  grabContainer: {
    flex: 1,
    alignItems: 'center'
  },
  releaseContainer: {
    flex: 1,
    alignItems: 'center'
  },
  middleZone: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#DC4924",
    width: 90,
    height: 90,
    alignItems: "center",
    padding: 27,
    borderRadius: 10
  },
  text: {
    textAlign: 'center',
    color: '#DCBE24',
    fontWeight: "bold"
  },
  midButton: {
    backgroundColor: "#DC4924",
    width: 120,
    height: 90,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 18,
    borderRadius: 10
  }
});
