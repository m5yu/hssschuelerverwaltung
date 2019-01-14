import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactTable from 'react-table';
import Modal from './Modal.js';
import "react-table/react-table.css";


class StudentOverview extends Component {
    constructor(props) {
        super(props);
    

    this.state = {
        students: [],
        isOpen: false,
        studentSelected: {},
        loginVisibility: 'block',
        user: {
            username: '',
            password: ''
        }
      };
    } 
      async componentDidMount() {
        fetch(`http://localhost:8080/login`, {
            method: "GET",
            mode: "no-cors"
        })
        .then(response => response.json())
        .catch(error => console.log('error while fetching login'))
        .then(result => console.log(JSON.stringify(result)))
        .catch(error => console.log('error while fetching login'))
        /*this.updateStudentList();*/
    }

    toggleModal = (props) => {
        this.setState({
          isOpen: !this.state.isOpen,
          studentSelected: props
        });
      };

      updateStudentList = () => {
        fetch(`http://localhost:8080/schule`)
        .then(result => result.json())
        .then(studentList => {
            this.setState({
                students: studentList
            });
        });
      }

      approveDelete = (studentid) => {
        fetch(`http://localhost:8080/schule/${studentid}`, {
            method: 'delete'
        }).then(() => {
            this.setState({
                studentSelected: {},            
        });
        this.toggleModal();
        this.updateStudentList();
        })
      }

      handleChange = (event) => {
        let user = this.state.user;
        user[event.target.name] = event.target.value;
        this.setState({
            user: user 
        })
    }

    checkHTTPStatus = (httpResponse) => {
        
        let user = {username: '', password: ''}
        let isAuthenticated = false;
        let loginVisibility;
          
          if(httpResponse.status===200) {
            isAuthenticated = true;
            loginVisibility = 'none';
          }
          this.props.setAuthentification(isAuthenticated);
          this.setState({ 
            user: user, 
            loginVisibility: loginVisibility
        })
    }

      handleSubmit = (event) => {
          let loginData = {};
          fetch(`http://localhost:8080/login`)
          .then(response => response.json())
          .then(result => console.log(JSON.stringify(result)))

        let data = JSON.stringify(this.state.user)
        fetch(`http://localhost:8080/schule/login`, {
          method: 'POST',
          headers: {
              "Content-Type": "application/json",
          },
          body: data
      })
      .then(res => this.checkHTTPStatus(res))
    }

    componentDidUpdate()
    {
    }

    render() {

        function getLinkObject(props)
        {
            const newLink = {
                pathname: "/add-student",
                studentId: props.original.id
            }
            return newLink;
        }

        const columns = [{
            Header: 'Nachname',
            accessor: 'lastName',
            filterable: true
          }, {
            Header: 'Vorname',
            accessor: 'firstName',
            filterable: true
          }, {
            Header: 'Email',
            accessor: 'email',
            filterable: true
          }, {
            Header: 'Klasse',
            accessor: 'classId',
            filterable: true
          }, {
            Header: 'Unternehmen',
            accessor: 'company.company',
            filterable: true
          }, {
              Header: '',
              Cell: props => (
                    <div>
                        <Link to={getLinkObject(props)}><i className='fa fa-pencil fa-lg editStudentIcon'></i></Link>
                    </div>
              ),
              width: 50,
              resizable: false
          }, {
            Header: '',
            Cell: props => (
                  <div>
                      <i onClick={() => this.toggleModal(props.original)} className='fa fa-trash fa-lg deleteStudentIcon'></i>
                  </div>
            ),
            width: 50,
            resizable: false
        }
          ]

          if(!this.props.isAuthenticated){
              return (
                <div className="login" style={{display: this.state.loginVisibility}}>
          
                    Bitte einloggen
                    <br/>
                    <input required type='username' name='username' value={this.state.user.username} placeholder='Benutzername' onChange={(event) => this.handleChange(event)}/>
                    <input required type='password' name='password' value={this.state.user.password} placeholder='Passwort' onChange={(event) => this.handleChange(event)}/>
                    <br/>
                    <br/>
                    <button type='submit' onClick={this.handleSubmit}>Login</button>
            
                </div>);
          }

        return (
            <div>
                <div className='tableWrapper'>
                    <ReactTable
                        className={'-striped -highlight'}
                        data={this.state.students}
                        columns={columns}
                        defaultPageSize={20}
                    />
                </div>
                    <Modal student={this.state.studentSelected} show={this.state.isOpen} onApprove={this.approveDelete} onClose={this.toggleModal}>
                    </Modal>
            </div>
        )
    }
}

export default StudentOverview;
