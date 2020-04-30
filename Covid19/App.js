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
      //Country_Data: {
        Country: "",
        //CountryCode: "",
        //Slug: "",
        NewConfirmed: "",
        TotalConfirmed: "",
        NewDeaths: "",
        TotalDeaths: "",
        NewRecovered: "",
        TotalRecovered: "",
        Date: "",
      //},
      Globaldata: {
        NewConfirmed: "",
        TotalConfirmed: "",
        NewDeaths: "",
        TotalDeaths: "",
        NewRecovered: "",
        TotalRecovered: "",
        Date: ""
      }
    };
  }
  showdata() {

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

  ////var pullcountry;
  movemarker(e) {
    var latitude = e.nativeEvent.coordinate.latitude;
    var longitude = e.nativeEvent.coordinate.longitude;
    Geocoder.from(latitude, longitude)
		  .then(json => {
        var i;
        for (i = 0; i < json.results[0].address_components.length; i++) {
          if (json.results[0].address_components[i].types[0] == "country"){
            var pullcountry = json.results[0].address_components[i].long_name;
            //console.log(addressComponent)
            this.setState({
              Country: pullcountry
            }, () => this.getdata());
          }
        }
		  })
      .catch(error => console.warn(error));
      
  }
  getdata() {
    fetch('https://api.covid19api.com/countries', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(json => {
        this.setState ({
          data: {
            NewConfirmed: json["NewConfirmed"],
            TotalConfirmed: json["TotalConfirmed"],
            NewDeaths: json["NewDeaths"],
            TotalDeaths: json["TotalDeath"],
            NewRecovered: json["NewRecovered"],
            TotalRecovered: json["TotalRecovered"],
            Date: json["Date"],
          }
        }).then();
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
          onPress = {
            (e) => {
              this.movemarker(e);
            }
          }
      >
        <Marker
          /*
          //coordinate={{
            latitude: 42.350970,
            longitude: -71.110810,
          }}
          title={"Covid-19"}
          draggable
          onDragEnd = {
            (e) => {
              this.movemarker(e);
            }
          }
          */
        >
          <View style={{backgroundColor: "red", padding: 10}}>
            <Text>
              NewConfirmed: this.getdata.data.NewConfirmed
            </Text>
            <Text >
              TotalConfirmed: {this.getdata.data.TotalConfirmed}
            </Text>
            <Text >
              NewDeaths: {this.getdata.data.NewDeaths}
            </Text>
            <Text >
              TotalDeaths: {this.getdata.data.TotalDeaths}
            </Text>
            <Text >
              NewRecovered: {this.getdata.data.NewRecovered}
            </Text>
            <Text>
              TotalRecovered: {this.getdata.data.TotalRecovered}
            </Text>
            <Text >
              Date: {this.getdata.data.recovered}
            </Text>
          </View>
        </Marker>       
        />
      </MapView> 
    </View> 
    );
  }
}