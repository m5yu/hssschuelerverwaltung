package schule.datenbank.entity;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "student")
public class Student
{
    @Id
    private String                id;
    private String                firstName;//
    private String                lastName;//
    private String                zipCode;//
    private String                city;//
    private String                street;//
    private String                email;//
    private String                phone;//
    private String                kreis;//
    private String                state;//
    private String                dateOfBirth   = "1900-01-01";//
    private String                cityOfBirth;//
    private String                countryOfBirth;//
    private String                denomination;//
    private String                motherTongue;//
    private Gender                gender;//
    private MaritalStatus         maritalStatus;//
    private String                primaryNationality;//
    private String                secondaryNationality;//
    private boolean               germanIsPrimaryLanguage;//
    private PreviousSchool        previousSchool;//
    private EducationalBackground educationalBackground;//
    private List<String>          foreignLanguages;//
    private ContactPerson         primaryContactPerson;//
    private ContactPerson         secondaryContactPerson;//
    private String                classId;//
    private boolean               secondSchoolVisit;//
    private Company               company;//
    private boolean               zusatzqualifikationFachhochschule;//
    private String                trainingStart = "1900-01-01";
    private String                trainingEnd   = "1900-01-01";
    private boolean               trainingShortening;

    /** Betrieb **/

    @Override
    public String toString()
    {
        String languages = String.join("-", this.foreignLanguages);

        return firstName + ',' +
                lastName + ',' +
                zipCode + ',' +
                city + ',' +
                street + ',' +
                email + ',' +
                phone + ',' +
                kreis + ',' +
                state + ',' +
                dateOfBirth + ',' +
                cityOfBirth + ',' +
                countryOfBirth + ',' +
                denomination + ',' +
                motherTongue + ',' +
                gender + ',' +
                maritalStatus + ',' +
                primaryNationality + ',' +
                secondaryNationality + ',' +
                germanIsPrimaryLanguage + ',' +
                previousSchool + ',' +
                educationalBackground + ',' +
                languages + ',' +
                primaryContactPerson.getType() + ',' +
                primaryContactPerson.getFirstName() + ',' +
                primaryContactPerson.getLastName() + ',' +
                primaryContactPerson.getZipCode() + ',' +
                primaryContactPerson.getCity() + ',' +
                primaryContactPerson.getStreet() + ',' +
                primaryContactPerson.getEmail() + ',' +
                primaryContactPerson.getPhone() + ',' +
                secondaryContactPerson.getType() + ',' +
                secondaryContactPerson.getFirstName() + ',' +
                secondaryContactPerson.getLastName() + ',' +
                secondaryContactPerson.getZipCode() + ',' +
                secondaryContactPerson.getCity() + ',' +
                secondaryContactPerson.getStreet() + ',' +
                secondaryContactPerson.getEmail() + ',' +
                secondaryContactPerson.getPhone() + ',' +
                classId + ',' +
                secondSchoolVisit + ',' +
                company.getJob() + ',' +
                company.getJobNr() + ',' +
                company.getCompany() + ',' +
                company.getZipCode() + ',' +
                company.getCity() + ',' +
                company.getStreet() + ',' +
                company.getEmail() + ',' +
                company.getPhone() + ',' +
                company.getInstructor() + ',' +
                getTrainingStart() + ',' +
                getTrainingEnd() + ',' +
                isTrainingShortening() + ',' +
                company.getKammer() + ',' +
                zusatzqualifikationFachhochschule;
    }
}
