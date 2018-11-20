package schule.datenbank.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
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

    public void save(Student student)
    {
        studentRepository.save(student);
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
        return studentRepository.findById(id);
    }

    public void delete(String studentId)
    {
        studentRepository.delete(studentId);
    }
}
