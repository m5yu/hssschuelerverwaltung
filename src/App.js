import React, { Component } from 'react';
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import AddStudent from './AddStudent';
import StudentOverview from './StudentOverview';
import './App.css';
import './index.css';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isAuthenticated: false,
      user: {
        username: '',
        password: ''
      },
    }
  }

  setAuthentification = (isAuthenticated) => {
    console.log('Hallo aus App')
    console.log(this.state)
    this.setState({
      isAuthenticated: isAuthenticated
    })
  }

  render() {

    return (

      <div className="App">
        <a className='btn btn-warning btn-large linkmargin' href='#/add-student' target='_self'>Schüler hinzufügen</a>
        <a className='btn btn-warning btn-large linkmargin' href='#/student-overview' target='_self'>Alle Schüler</a>
        <a className='btn btn-info btn-large linkmargin' href='http://localhost:8080/schule/export' target='_self'>Download CSV-Export</a>

          <Router>
            <Switch>
              <Route exact path="/add-student" render={(props)=> <AddStudent {...props} setAuthentification={this.setAuthentification} isAuthenticated={this.state.isAuthenticated} />} />
              <Route exact path="/student-overview" render={()=> <StudentOverview setAuthentification={this.setAuthentification} isAuthenticated={this.state.isAuthenticated} />} />

              <Redirect to="/student-overview" render={()=> <StudentOverview setAuthentification={this.setAuthentification} isAuthenticated={this.state.isAuthenticated} />} />
            </Switch>
          </Router>
      </div>
    );
  }
}

export default App;
