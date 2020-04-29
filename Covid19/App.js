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

import React from 'react';
import {StyleSheet, Text, View } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geocoder from 'react-native-geocoding';

Geocoder.init("AIzaSyDSpi2YP6vmCM923GQksTGjnft6GIqifxs");



export default class App extends React.Component {
  
  constructor(){
    super();
    state = {
      Country_Data: {
        Country: "",
        CountryCode: "",
        Slug: "",
        NewConfirmed: "",
        TotalConfirmed: "",
        NewDeaths: "",
        TotalDeath: "",
        NewRecovered: "",
        TotalRecovered: "",
        Date: ""
      },
      Globaldata: {
        NewConfirmed: "",
        TotalConfirmed: "",
        NewDeaths: "",
        TotalDeath: "",
        NewRecovered: "",
        TotalRecovered: "",
        Date: ""
      }
    };
  }

  componentDidMount() {
    fetch('https://api.covid19api.com/summary', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(json => {
        console.log(json['Global']['NewConfirmed'])
    
      })
      .catch(error => {
        console.error(error);
      });
  }
  handlepress(e) {
    console.log(e.nativeEvent.coordinate)
    //instead of console.log, learn how to use google geocoder in react native and will give you the country if you parse it right
  }
  onRegionChange(e) {
    console.log(e.nativeEvent.coordinate.latitude)
    console.log(e.nativeEvent.coordinate.longitude)
    //this.setState(latitude: e.nativeEvent.coordinate.longitude)
    Geocoder.from({
      latitude : e.nativeEvent.coordinate.latitude,
      longitude : e.nativeEvent.coordinate.longitude,
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
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421}}
        onPress = {this.handlepress}
      >

        <Marker
          coordinate={{
            latitude: 42.350970,
            longitude: -71.110810,
          }}
          title={"Covid-19"}
          //description={''}
          draggable
          onDragEnd={
            (e) => {
              this.onRegionChange(e);
            }
          }
        />

      </MapView> 

      
    
    </View> 
    );
  }
}

