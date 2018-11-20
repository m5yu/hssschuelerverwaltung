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
    private String              id;
    private String              firstName;
    private String              lastName;
    private String              zipCode;
    private String              city;
    private String              street;
    private String              email;
    private String              phone;
    private String              kreis;
    private String              state;
    private String              dateOfBirth;
    private String              cityOfBirth;
    private String              countryOfBirth;
    private String              denomination;
    private String              motherTongue;
    private Gender              gender;
    private MaritalStatus       maritalStatus;
    private List<String>        nationalities;
    private String              familyLanguage;
    private PreviousSchool      previousSchool;
    private List<String>        educationalBackground;
    private List<String>        foreignLanguages;
    private List<ContactPerson> contactPersons;
    private String              classId;
    private boolean             secondSchoolVisit;
    private Company             company;
    private boolean             zusatzqualifikationFachhochschule;
    /**Betrieb **/
}
