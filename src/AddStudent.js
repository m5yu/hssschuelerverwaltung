import React, { Component } from 'react';
import Select from 'react-select';

class AddStudent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            student:    {
                            primaryContactPerson: {},
                            secondaryContactPerson: {},
                            company: {}
                        },
            user: {
                username: '',
                password: ''
            },
            caregiverVisibility : 'none',
            loginVisibility: 'none',
            distinctCompanies : []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePrimaryContactPersonChange = this.handlePrimaryContactPersonChange.bind(this);
        this.handleSecondaryContactPersonChange = this.handleSecondaryContactPersonChange.bind(this);
        this.handleCompanyChange = this.handleCompanyChange.bind(this);
        this.parseCompanies = this.parseCompanies.bind(this);
        this.toggleCaregiver = this.toggleCaregiver.bind(this);
        this.renderCheckbox = this.renderCheckbox.bind(this);
    }

    renderCheckbox(){
        if(this.state.caregiverVisibility === 'none') {
            return  <input type="checkbox" onChange={(event)=> this.toggleCaregiver(event)}/>;
        }
        return  <input type="checkbox" onChange={(event)=> this.toggleCaregiver(event)} checked/>;
    }

    toggleCaregiver(event){
        let visibility = event.target.checked ? 'grid' : 'none';
        this.setState({
            caregiverVisibility : visibility
        })
    }

    handleChange(event) {
        const name = event.target.name;
        let student = this.state.student;
        let value = event.target.value === 'true' ? true : event.target.value === 'false' ? false : event.target.value;
        if(name === 'foreignLanguages') {
            value = value.replace(/\s/g,'').split(',');
        }
        student[name] = value;
        this.setState({
            student: student
        })
    }

    handleCustomSelect = (selectedOption) => {
        let selectedCompanyName = selectedOption.value.split('~?&')[0];
        let selcetedCompanyJob = selectedOption.value.split('~?&')[1];
        let selectedCompany = this.state.distinctCompanies.filter(company => company.company===selectedCompanyName&company.job===selcetedCompanyJob)[0];
        let student = this.state.student;
        student.company = selectedCompany;

        this.setState({
            selectedCompany: selectedOption,
            student: student
        });

    }

    handleLoginChange = (event) => {
        let user = this.state.user;
        user[event.target.name] = event.target.value;
        this.setState({
            user: user 
        })
    }

    handleLoginSubmit = (event) => {
        let data = JSON.stringify(this.state.user)
        fetch(`http://localhost:8080/login`, {
          method: 'POST',
          headers: {
              "Content-Type": "application/json",
          },
          body: data
      })
      .then(res => this.checkHTTPStatus(res))
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

    handlePrimaryContactPersonChange(event) {
        const name = event.target.name.replace('primaryContactPerson.','');
        let student = this.state.student;
        let value = event.target.value
        student.primaryContactPerson[name] = value;
        this.setState({
            student: student,
        })
    }

    handleSecondaryContactPersonChange(event) {
        const name = event.target.name.replace('secondaryContactPerson.','');
        let student = this.state.student;
        let value = event.target.value
        student.secondaryContactPerson[name] = value;
        this.setState({
            student: student
        })
    }

    handleCompanyChange(event) {
        const name = event.target.name.replace('company.','');
        let student = this.state.student;
        let value = event.target.value
        student.company[name] = value;
        this.setState({
            student: student,
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        let studentToSave = JSON.stringify(this.state.student);
        fetch(`http://localhost:8080/schule`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: studentToSave
        })
        .then(res => res.json())
        .catch(error => console.log(`Error: ${error}`))
        .then(response => {
                if(response.id != null)
                {
                    alert('Schüler wurde erfolgreich gespeichert');                }
            });
    }

    parseCompanies() {
        if(this.state.distinctCompanies != null) {
            return this.state.distinctCompanies
                .map(company => ({value: company.company+'~?&'+company.job, label: company.company+' - '+company.job}));
        }
        return {value: 'TestUnternehmen', label: 'TestLabel'};        
    }

    componentDidUpdate(prevProps,prevState) {
        
    }

    componentDidMount() {
        fetch(`http://localhost:8080/schule/company`)
        .then(result => result.json())
        .then(companies => {
            this.setState({
                distinctCompanies : companies
            });
        });
        if(this.props.location.studentId != null)
        {
            console.log('found valid studentid');
        fetch(`http://localhost:8080/schule/byId/${this.props.location.studentId}`)
        .then(result => result.json())
        .then(student => {
            student.germanIsPrimaryLanguage = student.id == null ? null : student.germanIsPrimaryLanguage;
            student.secondSchoolVisit = student.id == null ? null : student.secondSchoolVisit;
            student.zusatzqualifikationFachhochschule = student.id == null ? null : student.zusatzqualifikationFachhochschule;
            let visibility = student.id == null ? 'none' : student.secondaryContactPerson.firstName == null ? 'none' : 'grid';
            this.setState({
                student: student,
                caregiverVisibility : visibility
            });
        });
    }
    }

    render() {

        if(!this.props.isAuthenticated) {
            return (
                <div className="login" style={{display: this.state.visibility}}>
          
                    Bitte einloggen
                    <br/>
                    <input required type='username' name='username' value={this.state.user.username} placeholder='Benutzername' onChange={(event) => this.handleLoginChange(event)}/>
                    <input required type='password' name='password' value={this.state.user.password} placeholder='Passwort' onChange={(event) => this.handleLoginChange(event)}/>
                    <br/>
                    <br/>
                    <button type='submit' onClick={this.handleLoginSubmit}>Login</button>
            
                </div>);
        }

        return (
           <div>
            <form onSubmit={(event) => this.handleSubmit(event)}>
            <div className='formWrapper'>
            <div className='personalInfo'>
                    <div>
                        <label>
                            Vorname *
                            <br/>
                            <input type='text' required name='firstName' placeholder='' value={this.state.student.firstName || ''} 
                            onChange={(event)=>this.handleChange(event)}/>
                        </label>
                    </div>
                    <div>
                        <label>
                            Nachname *
                            <br/>
                            <input type='text' required name='lastName' placeholder='' value={this.state.student.lastName || ''} 
                            onChange={(event)=>this.handleChange(event)}/>
                        </label>
                    </div>
                    <div>
                        <label>
                            Postleitzahl *
                            <br/>
                            <input type='text' required name='zipCode' placeholder='' value={this.state.student.zipCode || ''} 
                            onChange={(event)=>this.handleChange(event)}/>
                        </label>
                    </div>
                    <div>
                        <label>
                            Stadt *
                            <br/>
                            <input type='text' required name='city' placeholder='' value={this.state.student.city || ''} 
                            onChange={(event)=>this.handleChange(event)}/>
                        </label>
                    </div>
                    <div>
                        <label>
                            Straße *
                            <br/>
                            <input type='text' required name='street' placeholder='' value={this.state.student.street || ''} 
                            onChange={(event)=>this.handleChange(event)}/>
                        </label>
                    </div>
                    <div>
                        <label>
                            Email *
                            <br/>
                            <input type='email' required name='email' placeholder='' value={this.state.student.email || ''} 
                            onChange={(event)=>this.handleChange(event)}/>
                        </label>
                    </div>
                    <div>
                        <label>
                            Telefonnummer *
                            <br/>
                            <input required type='text' name='phone' placeholder='062223055100' value={this.state.student.phone || ''} 
                            onChange={(event)=>this.handleChange(event)}/>
                        </label>
                    </div>
                    <div>
                        <label>
                            Kreis *
                            <br/>
                            <input type='text' required name='kreis' placeholder='' value={this.state.student.kreis || ''} 
                            onChange={(event)=>this.handleChange(event)}/>
                        </label>
                    </div>
                    <div>
                        <label>
                            Bundesland *
                            <br/>
                            <input type='text' required name='state' placeholder='Baden-Württemberg' value={this.state.student.state || ''} 
                            onChange={(event)=>this.handleChange(event)}/>
                        </label>
                    </div>
                    <div>
                        <label>
                            Geburtsdatum *
                            <br/>
                            <input type='date' required name='dateOfBirth' placeholder='Geburtsdatum' value={this.state.student.dateOfBirth || ''} 
                            onChange={(event)=>this.handleChange(event)}/>
                        </label>
                    </div>
                    <div>
                        <label>
                            Geburtsort *
                            <br/>
                            <input type='text' required name='cityOfBirth' placeholder='' value={this.state.student.cityOfBirth || ''} 
                            onChange={(event)=>this.handleChange(event)}/>
                        </label>
                    </div>
                    <div>
                        <label>
                            Geburtsland *
                            <br/>
                            <input type='text' required name='countryOfBirth' placeholder='' value={this.state.student.countryOfBirth || ''} 
                            onChange={(event)=>this.handleChange(event)}/>
                        </label>
                    </div>
                    <div>
                        <label>
                            Konfession *
                            <br/>
                            <input type='text' required name='denomination' placeholder='z.B. ev' value={this.state.student.denomination || ''} 
                            onChange={(event)=>this.handleChange(event)}/>
                        </label>
                    </div>
                    <div>
                        <label>
                            Muttersprache *
                            <br/>
                            <input type='text' required name='motherTongue' placeholder='' value={this.state.student.motherTongue || ''} 
                            onChange={(event)=>this.handleChange(event)}/>
                        </label>
                    </div>
                    <div>
                        <label>
                            Geschlecht *
                            <br/>
                            <select name='gender' required value={this.state.student.gender==null ? '' : this.state.student.gender} 
                            onChange={(event)=>this.handleChange(event)}>
                                <option name='gender' value='' style={{display: 'none'}}> -- Bitte auswählen -- </option>
                                <option name='gender' value='male'>Männlich</option>
                                <option name='gender' value='female'>Weiblich</option>
                            </select>
                        </label>
                    </div>
                    <div>
                        <label>
                            Familienstand 
                            <br/>
                            <select name='maritalStatus' required value={this.state.student.maritalStatus== null ? '' : this.state.student.maritalStatus} 
                            onChange={(event)=>this.handleChange(event)}>
                                <option name='maritalStatus' value='' style={{display: 'none'}}> -- Bitte auswählen -- </option>
                                <option name='maritalStatus' value='single'>Ledig</option>
                                <option name='maritalStatus' value='married'>Verheiratet</option>
                            </select>
                        </label>
                    </div>
                    <div>
                        <label>
                            Nationalität 1 *
                            <br/>
                            <input type='text' required name='primaryNationality' value={this.state.student.primaryNationality || ''} 
                            onChange={(event)=>this.handleChange(event)}/>
                        </label>
                    </div>
                    <div>
                        <label>
                            Nationalität 2
                            <br/>
                            <input type='text' name='secondaryNationality' value={this.state.student.secondaryNationality || ''} 
                            onChange={(event)=>this.handleChange(event)}/>
                        </label>
                    </div>
                    <div>
                        <label>
                            Welche Sprache sprechen Sie in Ihrer Familie bzw. im häuslichen Umfeld 
                            <br/>
                            <select name='germanIsPrimaryLanguage' required value={this.state.student.germanIsPrimaryLanguage == null ? '' : this.state.student.germanIsPrimaryLanguage} 
                            onChange={(event)=>this.handleChange(event)}>
                                <option name='germanIsPrimaryLanguage' value='' style={{display: 'none'}}> -- Bitte auswählen -- </option>
                                <option name='germanIsPrimaryLanguage' value={true}>Deutsch</option>
                                <option name='germanIsPrimaryLanguage' value={false}>Nicht Deutsch</option>
                            </select>
                        </label>
                    </div>
                    <div>
                        <label>
                            Zuletzt besuchte Schule *
                            <br/>
                            <select required name='previousSchool' value={this.state.student.previousSchool == null ? '' : this.state.student.previousSchool} 
                            onChange={(event)=>this.handleChange(event)}>
                                <option name='previousSchool' value='' style={{display: 'none'}}> -- Bitte auswählen -- </option>
                                <option name='previousSchool' value='Gemeinschaftsschule'>Gemeinschaftsschule</option>
                                <option name='previousSchool' value='Werkrealschule'>Werkrealschule</option>
                                <option name='previousSchool' value='Realschule'>Realschule</option>
                                <option name='previousSchool' value='Gymnasium'>Gymnasium</option>
                                <option name='previousSchool' value='gewerblicheBerufsschule'>gewerbliche Berufsschule</option>
                                <option name='previousSchool' value='kaufmännischeBerufsschule'>kaufmännische Berufsschule</option>
                                <option name='previousSchool' value='hauswirtschaftlicheBerufsschule'>hauswirtschaftliche Berufsschule</option>
                            </select>
                        </label>
                    </div>
                    <div>
                        <label>
                            Vorbildung *
                            <br/>
                            <select required name='educationalBackground' value={this.state.student.educationalBackground == null ? '' : this.state.student.educationalBackground} 
                            onChange={(event)=>this.handleChange(event)}>
                                <option name='educationalBackground' value='' style={{display: 'none'}}> -- Bitte auswählen -- </option>
                                <option name='educationalBackground' value='T'>Ohne Hauptschulabschluss (T)</option>
                                <option name='educationalBackground' value='H'>Mit Hauptschulabschluss (H)</option>
                                <option name='educationalBackground' value='WR'>Werkrealschulabschluss (WR)</option>
                                <option name='educationalBackground' value='G10'>Mittlerer Bildungsabschluss (G10)</option>
                                <option name='educationalBackground' value='FS'>Fachschulreife (FS)</option>
                                <option name='educationalBackground' value='FHR'>Fachhochschulreife (FHR)</option>
                                <option name='educationalBackground' value='ABI'>Hochschulereife (ABI)</option>
                            </select>
                        </label>
                    </div>
                    <div>
                        <label>
                    Fremdsprachen
                    <br/>
                    <input type='text' name='foreignLanguages' placeholder='Englisch,Französisch' value={this.state.student.foreignLanguages == null ? '' : this.state.student.foreignLanguages.join(',')}
                    onChange={(event)=>this.handleChange(event)}/>
                    </label>
                    </div>
                    </div>
                    <div className='contactPerson'>
                    <label>
                        Bezugsperson 1
                        <br/>
                        <div className='contactPersonGrid'>
                        <label>
                            Art der Bezugsperson *
                        <select required name='primaryContactPerson.type' value={this.state.student.primaryContactPerson.type == null ? '' : this.state.student.primaryContactPerson.type} 
                        onChange={(event)=>this.handlePrimaryContactPersonChange(event)}>
                            <option name='primaryContactPerson.type' value='' style={{display: 'none'}}> -- Bitte auswählen -- </option>
                            <option name='primaryContactPerson.type' value='father'>Vater</option>
                            <option name='primaryContactPerson.type' value='mother'>Mutter</option>
                            <option name='primaryContactPerson.type' value='spouse'>Ehegatte</option>
                            <option name='primaryContactPerson.type' value='caregiver'>Bezugsperson</option>
                            <option name='primaryContactPerson.type' value='asylum'>Heim</option>
                        </select>
                        </label>
                        <label>
                        Vorname *
                        <br/>
                        <input type='text' required name='primaryContactPerson.firstName' placeholder='' value={this.state.student.primaryContactPerson.firstName || ''} 
                        onChange={(event)=>this.handlePrimaryContactPersonChange(event)}/>
                        </label>
                        <label>
                        Nachname *
                        <br/>
                        <input type='text' required name='primaryContactPerson.lastName' placeholder='' value={this.state.student.primaryContactPerson.lastName || ''} 
                        onChange={(event)=>this.handlePrimaryContactPersonChange(event)}/>
                    </label>
                    <label>
                        Postleitzahl *
                        <br/>
                        <input type='text' required name='primaryContactPerson.zipCode' placeholder='' value={this.state.student.primaryContactPerson.zipCode || ''} 
                        onChange={(event)=>this.handlePrimaryContactPersonChange(event)}/>
                    </label>
                    <label>
                        Stadt *
                        <br/>
                        <input type='text' required name='primaryContactPerson.city' placeholder='' value={this.state.student.primaryContactPerson.city || ''} 
                        onChange={(event)=>this.handlePrimaryContactPersonChange(event)}/>
                    </label>
                    <label>
                        Straße *
                        <br/>
                        <input type='text' required name='primaryContactPerson.street' placeholder='' value={this.state.student.primaryContactPerson.street || ''} 
                        onChange={(event)=>this.handlePrimaryContactPersonChange(event)}/>
                    </label>
                    <label>
                        Email *
                        <br/>
                        <input type='email' required name='primaryContactPerson.email' placeholder='' value={this.state.student.primaryContactPerson.email || ''} 
                        onChange={(event)=>this.handlePrimaryContactPersonChange(event)}/>
                    </label>
                    <label>
                        Telefonnummer *
                        <br/>
                        <input type='text' required name='primaryContactPerson.phone' placeholder='062223055100' value={this.state.student.primaryContactPerson.phone || ''} 
                        onChange={(event)=>this.handlePrimaryContactPersonChange(event)}/>
                    </label>
                    </div> 
                    </label>
                    </div>
                    <div className='secondaryContactPerson'>
                        Bezugsperson 2
                        {this.renderCheckbox()}
                        <br/>
                        <div className='secondaryContactPersonGrid' style={{display: this.state.caregiverVisibility}}>
                        <label>
                            Art der Bezugsperson *
                        <select name='secondaryContactPerson.type' value={this.state.student.secondaryContactPerson.type == null ? '' : this.state.student.secondaryContactPerson.type} 
                        onChange={(event)=>this.handleSecondaryContactPersonChange(event)}>
                            <option name='secondaryContactPerson.type' value='' style={{display: 'none'}}> -- Bitte auswählen -- </option>
                            <option name='secondaryContactPerson.type' value='father'>Vater</option>
                            <option name='secondaryContactPerson.type' value='mother'>Mutter</option>
                            <option name='secondaryContactPerson.type' value='spouse'>Ehegatte</option>
                            <option name='secondaryContactPerson.type' value='caregiver'>Bezugsperson</option>
                            <option name='secondaryContactPerson.type' value='asylum'>Heim</option>
                        </select>
                        </label>
                        <label>
                        Vorname *
                        <br/>
                        <input type='text' name='secondaryContactPerson.firstName' placeholder='' value={this.state.student.secondaryContactPerson.firstName || ''} 
                        onChange={(event)=>this.handleSecondaryContactPersonChange(event)}/>
                        </label>
                        <label>
                        Nachname *
                        <br/>
                        <input type='text' name='secondaryContactPerson.lastName' placeholder='' value={this.state.student.secondaryContactPerson.lastName || ''} 
                        onChange={(event)=>this.handleSecondaryContactPersonChange(event)}/>
                    </label>
                    <label>
                        Postleitzahl *
                        <br/>
                        <input type='text' name='secondaryContactPerson.zipCode' placeholder='' value={this.state.student.secondaryContactPerson.zipCode || ''} 
                        onChange={(event)=>this.handleSecondaryContactPersonChange(event)}/>
                    </label>
                    <label>
                        Stadt *
                        <br/>
                        <input type='text' name='secondaryContactPerson.city' placeholder='' value={this.state.student.secondaryContactPerson.city || ''} 
                        onChange={(event)=>this.handleSecondaryContactPersonChange(event)}/>
                    </label>
                    <label>
                        Straße *
                        <br/>
                        <input type='text' name='secondaryContactPerson.street' placeholder='' value={this.state.student.secondaryContactPerson.street || ''} 
                        onChange={(event)=>this.handleSecondaryContactPersonChange(event)}/>
                    </label>
                    <label>
                        Email *
                        <br/>
                        <input type='email' name='secondaryContactPerson.email' placeholder='' value={this.state.student.secondaryContactPerson.email || ''} 
                        onChange={(event)=>this.handleSecondaryContactPersonChange(event)}/>
                    </label>
                    <label>
                        Telefonnummer *
                        <br/>
                        <input type='text' name='secondaryContactPerson.phone' placeholder='062223055100' value={this.state.student.secondaryContactPerson.phone || ''} 
                        onChange={(event)=>this.handleSecondaryContactPersonChange(event)}/>
                    </label> 
                    </div>
                    </div>
                    <div className='additionalInfo'>
                    <label>
                        War der Schüler schon einmal an unserer Schule angemeldet? *
                        <br/>
                        <select required name='secondSchoolVisit' value={this.state.student.secondSchoolVisit == null ? '' : this.state.student.secondSchoolVisit} 
                        onChange={(event)=>this.handleChange(event)}>
                            <option name='secondSchoolVisit' value='' style={{display: 'none'}}> -- Bitte auswählen -- </option>
                            <option name='secondSchoolVisit' value={true}>Ja</option>
                            <option name='secondSchoolVisit' value={false}>Nein</option>
                        </select>
                    </label>
                    <label>
                        Teilnahme an der Zusatzqualifikation zur Fachhochschulreife *
                        <br/>
                        <select required name='zusatzqualifikationFachhochschule' value={this.state.student.zusatzqualifikationFachhochschule == null ? '' : this.state.student.zusatzqualifikationFachhochschule} 
                        onChange={(event)=>this.handleChange(event)}>
                            <option name='zusatzqualifikationFachhochschule' value='' style={{display: 'none'}}> -- Bitte auswählen -- </option>
                            <option name='zusatzqualifikationFachhochschule' value={true}>Ja</option>
                            <option name='zusatzqualifikationFachhochschule' value={false}>Nein</option>
                        </select>
                    </label>
                    <label>
                        Klasse *
                        <br/>
                        <input type='text' required name='classId' placeholder='E3FIAE1' value={this.state.student.classId || ''} 
                        onChange={(event)=>this.handleChange(event)}/>
                    </label>
                    </div>
                    <div className='company'>
                    Beruf/Betrieb
                    <div className='customSelectWrapper'>
                    <Select
                        className='customSelect'
                        value={this.state.selectedCompany}
                        onChange={this.handleCustomSelect}
                        options={this.parseCompanies()}
                    />
                    </div>
                    <div className='companyGrid'>
                    <label>
                        Beruf *
                        <br/>
                        <input type='text' required name='company.job' placeholder='' value={this.state.student.company.job || ''} 
                        onChange={(event)=>this.handleCompanyChange(event)}/>
                    </label>
                    <label>
                        Berufs-Nr. *
                        <br/>
                        <input type='text' required name='company.jobNr' placeholder='12345' value={this.state.student.company.jobNr || ''} 
                        onChange={(event)=>this.handleCompanyChange(event)}/>
                    </label>
                    <label>
                        Betrieb *
                        <br/>
                        <input type='text' required name='company.company' placeholder='' value={this.state.student.company.company || ''} 
                        onChange={(event)=>this.handleCompanyChange(event)}/>
                    </label>
                    <label>
                        Postleitzahl *
                        <br/>
                        <input type='text' name='company.zipCode' placeholder='' value={this.state.student.company.zipCode || ''} 
                        onChange={(event)=>this.handleCompanyChange(event)}/>
                    </label>
                    <label>
                        Stadt *
                        <br/>
                        <input type='text' name='company.city' placeholder='' value={this.state.student.company.city || ''} 
                        onChange={(event)=>this.handleCompanyChange(event)}/>
                    </label>
                    <label>
                        Straße *
                        <br/>
                        <input type='text' name='company.street' placeholder='' value={this.state.student.company.street || ''} 
                        onChange={(event)=>this.handleCompanyChange(event)}/>
                    </label>
                    <label>
                        Email *
                        <br/>
                        <input type='email' required name='company.email' placeholder='' value={this.state.student.company.email || ''} 
                        onChange={(event)=>this.handleCompanyChange(event)}/>
                    </label>
                    <label>
                        Telefonnummer *
                        <br/>
                        <input type='text' required name='company.phone' placeholder='062223055100' value={this.state.student.company.phone || ''} 
                        onChange={(event)=>this.handleCompanyChange(event)}/>
                    </label> 
                    <label>
                        Ausbilder *
                        <br/>
                        <input type='text' required name='company.instructor' placeholder='' value={this.state.student.company.instructor || ''} 
                        onChange={(event)=>this.handleCompanyChange(event)}/>
                    </label> 
                    <label>
                        Beginn *
                        <input type='date' required name='trainingStart' placeholder='' value={this.state.student.trainingStart || ''} 
                        onChange={(event)=>this.handleChange(event)}/>
                    </label>
                    <label>
                        und Ende *
                        <input type='date' required name='trainingEnd' placeholder='' value={this.state.student.trainingEnd || ''} 
                        onChange={(event)=>this.handleChange(event)}/>
                        der Ausbildung
                    </label>
                    <label>
                        Ausbildungszeitverkürzung? *
                        <br/>
                        <select required name='trainingShortening' value={this.state.student.trainingShortening == null ? '' : this.state.student.trainingShortening} 
                        onChange={(event)=>this.handleChange(event)}>
                            <option name='secondSchoolVisit' value='empty' style={{display: 'none'}}> -- Bitte auswählen -- </option>
                            <option name='secondSchoolVisit' value={true}>Ja</option>
                            <option name='secondSchoolVisit' value={false}>Nein</option>
                        </select>
                    </label>
                    <label>
                        Kammer *
                        <br/>
                        <select required name='company.kammer' value={this.state.student.company.kammer == null ? '' : this.state.student.company.kammer} 
                        onChange={(event)=>this.handleCompanyChange(event)}>
                            <option name='secondSchoolVisit' value='' style={{display: 'none'}}> -- Bitte auswählen -- </option>
                            <option name='secondSchoolVisit' value='IHK'>IHK</option>
                            <option name='secondSchoolVisit' value='HWK'>HWK</option>
                        </select>
                    </label>
                    </div>
                    </div>
                    <div className='submitBtn'>
                    <input type='submit' className='btn btn-info btn-large linkmargin' value='Schüler speichern'/>
                    <br/>
                    * Pflichtfelder
                    </div>
                    </div>
               </form>
           </div>
        )
    }
}

export default AddStudent;
