/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

/*This is an Example of React Native Map*/
/*
import React from 'react';
import { StyleSheet, Text, View , TextInput} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
*/

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, {Component} from 'react';
import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geocoder from 'react-native-geocoding';

Geocoder.init("AIzaSyDSpi2YP6vmCM923GQksTGjnft6GIqifxs");

const covid19image = {uri: "https://seiuhcilin.org/wp-content/uploads/2020/03/Coronavirus-COVID-19.jpg"}

function homepage() {
  return(
    <View style={{justifyContent: "center", alignItems: "center"}}>
      <ImageBackground source = {covid19image} style = {{width: '100%', height: '100%'}}>
        <View style={{flex: .3,justifyContent: "center", alignItems: "center"}}>
          <Text style={{textAlignVertical: "top", textAlign: "center", fontSize: 44, color: 'white'}}>
            COVID-19 World Map 
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
}
const Tab = createBottomTabNavigator();

export default class App extends Component {

  render(){
    return(
      <NavigationContainer>
        <Tab.Navigator initialRouteName = "Home">
          <Tab.Screen name = "Home" component = {homepage}/>
          <Tab.Screen name = "Map" component = {Covid19_data}/>
        </Tab.Navigator>
      </NavigationContainer>
    );

  }
}




class Covid19_data extends React.Component {
  
  constructor(){
    super();
    this.state = {
      Country: "",
      CountryCode: "",
      NewConfirmed: "",
      TotalConfirmed: "",
      NewDeaths: "",
      TotalDeaths: "",
      NewRecovered: "",
      TotalRecovered: "",
      Date: "",
      Globaldata: {
        NewConfirmed: "",
        TotalConfirmed: "",
        NewDeaths: "",
        TotalDeaths: "",
        NewRecovered: "",
        TotalRecovered: "",
        Date: ""
      },
      marker: {
      }
    };
    this.movemarker = this.movemarker.bind(this);
    this.getdata = this.getdata.bind(this);
  }
  
  movemarker(e) {
    var coordinate = e.nativeEvent.coordinate;
    
    this.setState({
      marker: {
        coordinate: e.nativeEvent.coordinate,
        key: 0
      }
    });

    Geocoder.from(coordinate)
		  .then(json => {
        var i;
        for (i = 0; i < json.results[0].address_components.length; i++) {
          if (json.results[0].address_components[i].types[0] == "country"){
            var pullcountrycode = json.results[0].address_components[i].short_name;
            var pullcountry = json.results[0].address_components[i].long_name;
            this.setState({
              CountryCode: pullcountrycode,
              Country: pullcountry
            }, () => this.getdata());
          }
        }
		  })
      .catch(error => console.warn(error)); 
  }

  getdata() {
    fetch('https://api.covid19api.com/summary', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(json => {
        var i;
        for (i = 0; i < json["Countries"].length; i++) {
          if (json["Countries"][i]["CountryCode"] == this.state.CountryCode) {
            this.setState ({
              NewConfirmed: json["Countries"][i]["NewConfirmed"],
              TotalConfirmed: json["Countries"][i]["TotalConfirmed"],
              NewDeaths: json["Countries"][i]["NewDeaths"],
              TotalDeaths: json["Countries"][i]["TotalDeaths"],
              NewRecovered: json["Countries"][i]["NewRecovered"],
              TotalRecovered: json["Countries"][i]["TotalRecovered"],
              Date: json["Countries"][i]["Date"]
            })
          }
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return (
      <View style={{ paddingTop: 30, flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        onPress = {this.movemarker}
      >
      </MapView> 
      <View style={{flex: .3, backgroundColor: "darksalmon", padding: 10}}>
        <Text style={{fontSize: 32}}>
          {this.state.Country}
        </Text>
        <Text style = {{fontSize: 16}}>
          NewConfirmed: {this.state.NewConfirmed}
        </Text>
        <Text style = {{fontSize: 16}}>
          TotalConfirmed: {this.state.TotalConfirmed}
        </Text>
        <Text style = {{fontSize: 16}}>
          NewDeaths: {this.state.NewDeaths}
        </Text>
        <Text style = {{fontSize: 16}}>
          TotalDeaths: {this.state.TotalDeaths}
        </Text>
        <Text style = {{fontSize: 16}}>
          NewRecovered: {this.state.NewRecovered}
        </Text>
        <Text style = {{fontSize: 16}}>
          TotalRecovered: {this.state.TotalRecovered}
        </Text >
        <Text style = {{fontSize: 16}}>
          Date: {this.state.Date}
        </Text>
    </View> 
    </View> 
    );
  }
}