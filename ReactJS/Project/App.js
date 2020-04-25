import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {iconSet} from 'react-native-vector-icons/AntDesign';


export default class App extends Component{
  sendDirection(s) {
    const data = { direction: s };
    console.log(JSON.stringify(data))
    fetch('http://138.197.73.249:80/', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(function(response){ 
      return response.json();   
     })
    .then(function(data){ 
     console.log(data)
    })
    .catch((error) => {
      console.log('Error:', error);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.upContainer}>
          <TouchableOpacity style={styles.button} onPress={() => this.sendDirection("w")}>
            <Text style={styles.text}>UP</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.centerContainer}>
          <View style={styles.middleZone}>
            <TouchableOpacity style={styles.button} onPress={() => this.sendDirection("a")}>
              <Text style={styles.text}>LEFT</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.middleZone}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.text}>JOKE</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.middleZone}>
            <TouchableOpacity style={styles.button} onPress={() => this.sendDirection("d")}>
              <Text style={styles.text}>RIGHT</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.downContainer}>
          <TouchableOpacity style={styles.button} onPress={() => this.sendDirection("s")}>
            <Text style={styles.text}>DOWN</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  upContainer: {
    flex: 3,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  downContainer: {
    flex: 3,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  centerContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  middleZone: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#d3d3d3",
    width: 100,
    height: 80,
    alignItems: "center",
    padding: 27,
    borderRadius: 10
  },
  text: {
    textAlign: 'center'
  }
});
