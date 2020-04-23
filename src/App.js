import React from 'react';

import './App.css';

const API_URL = 'http://api.openweathermap.org/data/2.5/weather';
const CITY = 'Krakow';
const UNITS = 'metric';
const APP_ID = '02e4152bece065f699b3756e49e7acab';

const URL = `${API_URL}?q=${CITY}&units=${UNITS}&appid=${APP_ID}`;

class App extends React.Component {

  state = 
  {
    temperature: '',
    icon: ''
  }
  componentDidMount()
  {
    fetch(URL)
    .then(response => response.json())
    .then(data => {
      
      this.setState({
        temperature: data.main.temp,
        icon: data.weather[0].icon
      });
    })
  }

  render() {
    return (
      <div className="App">
        {this.state.temperature} &#8451;
        <img src = {`http://openweathermap.org/img/wn/${this.state.icon}@2x.png`} alt = "icon" />
      </div>
    );
  }
}

export default App;
