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

export default class App extends React.Component {
  render() {
    return (
      <MapView
        style={{ flex: 1 }}
        showsUserLocation
        initialRegion={{
        latitude: 42.350970,
        longitude: -71.110810,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421}}
      >

        <Marker
          coordinate={{
            latitude: 42.350970,
            longitude: -71.110810,
          }}
          title={"Title"}
          description={'Marker'}
        />

      </MapView>  
    );
  }
}
