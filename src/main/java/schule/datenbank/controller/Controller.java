package schule.datenbank.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import schule.datenbank.entity.Student;
import schule.datenbank.service.StudentService;

@RestController
@RequestMapping(path="/schule")
public class Controller
{
    private StudentService studentService;

    @Autowired
    public Controller(StudentService studentService)
    {
        this.studentService = studentService;
    }

    @GetMapping(path = "")
    public List<Student> getStudents()
    {
        return studentService.findAll();
    }

    @GetMapping(path = "/byLastName/{lastName}")
    public List<Student> findByLastName(@PathVariable String lastName)
    {
        return studentService.findByLastName(lastName);
    }

    @GetMapping(path = "/byId/{id}")
    public Student findById(@PathVariable String id)
    {
        return studentService.findById(id);
    }

    @PostMapping(path ="")
    public void save(@RequestBody Student student)
    {
        studentService.save(student);
    }

    @DeleteMapping(path = "/{studentId}")
    public void deleteStudent(@PathVariable String studentId)
    {
        studentService.delete(studentId);
    }

}
