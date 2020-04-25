import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {LeftOutlined} from 'react-native-vector-icons/AntDesign';



export default class App extends Component{
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.upContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>UP</Text>
            <LeftOutlined />
          </TouchableOpacity>
        </View>
        <View style={styles.centerContainer}>
          <View style={styles.middleZone}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.text}>LEFT</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.middleZone}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.text}>JOKE</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.middleZone}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.text}>RIGHT</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.downContainer}>
          <TouchableOpacity style={styles.button}>
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
