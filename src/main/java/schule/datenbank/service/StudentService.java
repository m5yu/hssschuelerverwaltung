package schule.datenbank.service;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletResponse;

import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import schule.datenbank.entity.Company;
import schule.datenbank.entity.Student;
import schule.datenbank.repository.StudentRepository;

@Service
public class StudentService
{
    private final StudentRepository studentRepository;

    @Autowired
    public StudentService(StudentRepository studentRepository)
    {
        this.studentRepository = studentRepository;
    }

    public Student save(Student student)
    {
        return studentRepository.save(student);
    }

    public Student findByFirstname(String firstname)
    {
        return studentRepository.findByFirstName(firstname);
    }

    public List<Student> findAll()
    {
        return studentRepository.findAll();
    }

    public List<Student> findByLastName(String lastName)
    {
        return studentRepository.findByLastName(lastName);
    }

    public Student findById(String id)
    {
        return studentRepository.findById(id).orElse(new Student());
    }

    public void delete(String studentId)
    {
        studentRepository.deleteById(studentId);
    }

    public List<Company> findAllDistinctCompaniesWithJob()
    {
        List<Company> companies = studentRepository.findAll().stream()
                .filter(student1 -> student1.getCompany() != null)
                .map(student -> student.getCompany())
                .collect(Collectors.toList());

        Set<String> companyJobCombination = companies.stream()
                .map(company -> company.getCompany() + "$%&" + company.getJob())
                .collect(Collectors.toSet());

        return companyJobCombination.stream().
                map(combination -> findByCompanyJobCombination(combination.split("\\$%&")[0], combination.split("\\$%&")[1]))
                .collect(Collectors.toList());
    }

    private Company findByCompanyJobCombination(String companyName, String job)
    {
        return studentRepository.findByCompanyAndJob(companyName, job).stream().findFirst().get().getCompany();
    }

    public void fileDownload(HttpServletResponse response) throws IOException
    {
        List<Student> students = this.findAll();
        String csvHeader = "firstName,lastName,zipCode,city,street,email,phone,kreis,state,dateOfBirth,cityOfBirth" +
                "countryOfBirth,denomination,motherTongue,gender,maritalStatus,primaryNationality,secondaryNationality" +
                "germanIsPrimaryLanguage,previousSchool,educationalBackground,languages,primaryContactPersonType" +
                "primaryContactPersonFirstName,primaryContactPersonLastName,primaryContactPersonZipCode,primaryContactPersonCity" +
                "primaryContactPersonStreet,primaryContactPersonEmail,primaryContactPersonPhone,secondaryContactPersonType" +
                "secondaryContactPersonFirstName,secondaryContactPersonLastName,secondaryContactPersonZipCode,secondaryContactPersonCity" +
                "secondaryContactPersonStreet,secondaryContactPersonEmail,secondaryContactPersonPhone,classId" +
                "secondSchoolVisit,companyJob,companyJobNr,companyCompanyName,companyZipCode,companyCity,companyStreet" +
                "companyEmail,companyPhone,companyInstructor,companyTrainingStart,companyTrainingEnd,companyTrainingShortening" +
                "companyKammer,zusatzQualifikationFachhochschule";

        for (Student s : students)
        {
            csvHeader = csvHeader + "\n" + s.toString();
        }

        try (InputStream inputStream = new ByteArrayInputStream(csvHeader.getBytes()))
        {
            response.setContentType("text/csv");
            response.addHeader("Content-Disposition", "attachment; filename= SchuelerverwaltungExport_" + LocalDateTime.now() + ".csv");
            IOUtils.copy(inputStream, response.getOutputStream());
            response.flushBuffer();
        }
        catch (IOException e)
        {
            throw new IOException("Datei konnte nicht gefunden werden");
        }
    }
}
