import * as React from 'react';
import { Text, View, StatusBar } from 'react-native';

export default class Appapi extends React.Component {
  state = {
    "Country": "",
    "CountryCode": "",
    "Slug": "",
    "NewConfirmed": "",
    "TotalConfirmed": "",
    "NewDeaths": "",
    "TotalDeaths": "",
    "NewRecovered": "",
    "TotalRecovered": "",
    "Date": ""
  };
  componentDidMount() {
    fetch('https://api.covid19api.com/summary', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(json => {
        this.setState({
          Country: json['Countries']['Country'],  
        });
        this.setState({
          CountryCode: json['Countries']['CountryCode'],  
        });
        this.setState({
          Slug: json['Countries']['Slug'],  
        });
        this.setState({
          NewConfirmed: json['Countries']['NewConfirmed'],  
        });
        this.setState({
          TotalConfirmed: json['Countries']['TotalConfirmed'],  
        });
        this.setState({
          NewDeaths: json['Countries']['NewDeaths'],  
        });
        this.setState({
          TotalDeaths: json['Countries']['TotalDeaths'],  
        });
        this.setState({
          NewConfirmed: json['Countries']['NewConfirmed'],  
        });
        this.setState({
          NewRecovered: json['Countries']['NewRecovered'],  
        });
        this.setState({
          Date: json['Countries']['Date'],  
        });
    
      })
      .catch(error => {
        console.error(error);
      });
  }
  render() {
    return (
      <View style={{ paddingTop: 30 }}>
        <Text>Country: {this.state.Country}</Text>
        <Text>CountryCode: {this.state.CountryCode}</Text>
        <Text>Slug: {this.state.Slug}</Text>
        <Text>NewConfirmed: {this.state.NewConfirmed}</Text>
        <Text>TotalConfirmed: {this.state.TotalConfirmed}</Text>
        <Text>NewDeaths: {this.state.NewDeaths}</Text>
        <Text>NewRecovered: {this.state.NewRecovered}</Text>
        <Text>TotalRecovered: {this.state.TotalRecovered}</Text>
        <Text>Date: {this.state.Date}</Text>
      </View>
    );
  }
}