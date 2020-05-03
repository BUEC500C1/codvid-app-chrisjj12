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
import {StyleSheet, Text, View } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geocoder from 'react-native-geocoding';



Geocoder.init("AIzaSyDSpi2YP6vmCM923GQksTGjnft6GIqifxs");

function homepage() {
  return(
    <View style={{flex:1,justifyContent: "center",alignItems: "center"}}>
      <Text style={{textAlignVertical: "center", textAlign: "center", fontSize: 32}}>
        Welcome to COVID-19 World Map App {'\n'}
      </Text>
      <Text style={{textAlignVertical: "center",textAlign: "center", fontSize: 24}}>
        Tap on any country and the latest data will show on your screen
      </Text>
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
        showsUserLocation
        initialRegion={{
          latitude: 42.350970,
          longitude: -71.110810,
          latitudeDelta: 60,
          longitudeDelta: 60}}
          onPress = {this.movemarker}
      >
        <Marker
          coordinate={this.state.marker.coordinate}
          key={0}
          title={"Covid-19"}
          description={this.state.Country}
        >
          <View style={{backgroundColor: "red", padding: 10}}>
            <Text style={{fontSize: 32}}>
              {this.state.Country}
            </Text>
            <Text>
              NewConfirmed: {this.state.NewConfirmed}
            </Text>
            <Text >
              TotalConfirmed: {this.state.TotalConfirmed}
            </Text>
            <Text >
              NewDeaths: {this.state.NewDeaths}
            </Text>
            <Text >
              TotalDeaths: {this.state.TotalDeaths}
            </Text>
            <Text >
              NewRecovered: {this.state.NewRecovered}
            </Text>
            <Text>
              TotalRecovered: {this.state.TotalRecovered}
            </Text>
            <Text >
              Date: {this.state.Date}
            </Text>
          </View>  
        </Marker>
      </MapView> 
    </View> 
    );
  }
}