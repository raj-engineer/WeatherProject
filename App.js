/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View,Alert } from 'react-native';
import WeatherSectionList from './components/WeatherSectionList';
import axios from 'axios';
const API_KEY = '26deb070c5e22161fdd5f6d8a4c3d8d0';

class App extends Component {

  state = {
    isLoading: false,
    zipCode: '',
    list: [],
    city: '',
    message:''

  };
  /**
   * 
   * @param {number} text ZipCode
   */
  handleZipCode = (text) => {
    this.setState({ zipCode: text })
  }
  handleSubmit = () => {
   // this.fetchWeather(this.state.zipCode)
    this.fetchWeatherUsingAxios(this.state.zipCode)
  }

  componentDidMount() {
    //this.fetchWeather(121001)
  }

  getDay(unix_timestamp) {

    var d = new Date(unix_timestamp * 1000);
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    var n = weekday[d.getDay()];
    return n;
  }

  handleError(error){
    if (error.response.status === 404) {
      Alert.alert(error.response.data.message);
    } else {
     
    
      Alert.alert('Sorry, something went wrong.', error.message);
    }
  }
  createSectionListData(list) {
    var newData = []
    list.map((item) => {
      var date = (item.dt_txt.split(" "))[0];
      let values = this.valueExist(date, newData)
      let isBool = values.value
      let index = values.index
      if (isBool) {
        newData[index].data.push(item)
      } else {
        newData.push({
          title: date,
          data: [item]
        })

      }
    });

    console.log(newData)
    this.setState(
      {
        list: newData
      }
    );
  }

  /**
   * Docummentation
   * @param {string} time  11-08-2020
   * @param {Array} newData  array for sectionList
   */
  valueExist(time, newData) {
    var value = false
    var index = null
    newData.map(function (newItem, i) {
      if (newItem.title == time) {
        value = true
        index = i
      }
    });
    return { value, index };
  }


  fetchWeather(zip) {
    fetch(
      "http://api.openweathermap.org/data/2.5/forecast?zip=" + (zip) + ",IN&appid=" + (API_KEY) + "&units=metric"

    )
      .then(res => res.json())
      .then(json => {
        
       // console.warn(json)
        this.createSectionListData(json.list)
        this.setState(
          {
            city: json.city,
            isLoading: false,
            error:json.message
          }
        );
      });
  }

  fetchWeatherUsingAxios(zip){
    axios.get("http://api.openweathermap.org/data/2.5/forecast?zip=" + (zip) + ",IN&appid=" + (API_KEY) + "&units=metric")
    .then(response => {
      console.log(response.data);
     
     this.createSectionListData(response.data.list)
        this.setState(
          {
            city: response.data.city,
            message:response.data.message
          }
        );

    })
    .catch(error => {
      
      this.handleError(error)
     
    })
    .finally(() => {
      this.setState({ isLoading: false,
      });
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.Container}>
        <View style={styles.Container}>
          <View style={styles.zipView}>
            <TextInput style={styles.input}
              keyboardType="number-pad"
              underlineColorAndroid="transparent"
              placeholder="Enter ZipCode"
              placeholderTextColor="#34495e"
              autoCapitalize="none"
              maxLength={6}
              onChangeText={this.handleZipCode} />
            <TouchableOpacity
              style={styles.submitButton}
              onPress={
                this.handleSubmit
              }>
              <Text style={styles.submitText}>Search</Text>
            </TouchableOpacity>
          </View>
          <WeatherSectionList obj={this.state.list} city={this.state.city} />
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create(
  {
    Container: {
      flex: 1,
      backgroundColor: '#ecf0f1',//'#f7b733',
    },
    zipView: {
      width: "100%",
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10
    },
    input: {
      width: "65%",
      borderColor: '#34495e',
      borderWidth: 2,
      height: 40,
      paddingLeft: 10
    },
    submitButton: {
      width: "30%",
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 4,
      alignItems: 'center',
      backgroundColor: "#34495e",
      padding: 5
    },
    submitText: {
      fontSize: 20,
      color: 'white'
    },

  }
);

export default App;