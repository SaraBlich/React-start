import React, { Component } from 'react';
import '../css/App.css';

import AddAppointment from './AddAppointment.js';
import SearchAppointment from './SearchAppointment.js';
import ListAppointments from './ListAppointments.js';

import {without, findIndex} from 'lodash';


class App extends Component {
  constructor() 
  {
    super();
    this.state = {
      myAppointment:[],
      formDisplay: false,
      orderBy: 'petName',
      orderDir: 'asc',
      queryText: '',
      lastIndex: 0
    };
    this.deleteAppointment = this.deleteAppointment.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.addAppointment = this.addAppointment.bind(this);
    this.changeOrder = this.changeOrder.bind(this);
    this.searchApts = this.searchApts.bind(this);
    this.updateInfo = this.updateInfo.bind(this);
  }

  updateInfo(name, value, id)
  {
    let tempApts = this.state.myAppointment;
    let aptIndex = findIndex(this.state.myAppointment, {
      aptId: id
    });
    tempApts[aptIndex][name] = value;
    this.setState({
      myAppointment: tempApts
    });
  }

  searchApts(query)
  {
    this.setState({
      queryText: query
    });
  }

  changeOrder(order, dir)
  {
    this.setState({
      orderBy: order,
      orderDir: dir
    });
  }

  addAppointment(apt)
  {
    let tempApts = this.state.myAppointment;
    apt.aptId = this.state.lastIndex;
    tempApts.unshift(apt);
    this.setState({
      myAppointment: tempApts,
      lastIndex: this.state.lastIndex + 1
    });

  }

  toggleForm()
  {
    this.setState({
      formDisplay: !this.state.formDisplay
    });
  }

  deleteAppointment(apt)
  {
    let tempApts = this.state.myAppointment;
    tempApts = without(tempApts, apt); // we are using loadash library, with has a method (without). it allows us to delete one record and returns record without 'this' appointment

    this.setState({
      myAppointment: tempApts
    });
  }

  componentDidMount()
  {
    fetch('./data.json')
    .then(res => res.json())
    .then(result => {
      const apts = result.map(item => {
        item.aptID = this.state.lastIndex;
        this.setState({lastIndex: this.state.lastIndex + 1}) // here we are adding the key to an every object displayed on the list. We cannot modify the state directrly, so we change it by using setState method
        return item;
      })
      this.setState({
      myAppointment: apts
      
    });
    });
  }
  render(){

    let order;
    let filteredApts = this.state.myAppointment;
    if(this.state.orderDir === 'asc')
    {
      order = 1;
    }
    else
    {
      order = -1;
    }

    filteredApts = filteredApts.sort((a, b) => {
      if (a[this.state.orderBy].toLowerCase() < 
      b[this.state.orderBy].toLowerCase())
      {
        return -1 * order;
      }
      else
      {
        return 1 * order;
      }
    }).filter(eachItem =>{
      return(
        eachItem['petName'].toLowerCase()
        .includes(this.state.queryText.toLowerCase()) ||
        eachItem['ownerName'].toLowerCase()
        .includes(this.state.queryText.toLowerCase()) ||
        eachItem['aptNotes'].toLowerCase()
        .includes(this.state.queryText.toLowerCase())
      );
    });

  return (
    <main className = "page bg-white" id = "petratings">
      <div className = "container">
        <div className = "row">
          <div className = "col-md-12 bg-white">
            <div className = "container">
              
              <AddAppointment 
                formDisplay = {this.state.formDisplay}
                toggleForm = {this.toggleForm}
                addAppointment = {this.addAppointment}
              />
              <SearchAppointment 
              orderBy = {this.state.orderBy}
              orderDir = {this.state.orderDir}
              changeOrder = {this.changeOrder}
              searchApts = {this.searchApts}
              />
              <ListAppointments 
              appointments = {filteredApts} 
              deleteAppointment = {this.deleteAppointment}
              updateInfo = {this.updateInfo}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  
  );
}
}

export default App;
