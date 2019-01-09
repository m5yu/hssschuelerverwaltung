package schule.datenbank.controller;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import schule.datenbank.entity.Company;
import schule.datenbank.entity.Student;
import schule.datenbank.service.StudentService;
import schule.datenbank.service.TestClassService;

@RestController
@CrossOrigin
@RequestMapping(path = "/schule")
public class Controller
{
    private StudentService   studentService;
    private TestClassService testClassService;

    @Autowired
    public Controller(StudentService studentService, TestClassService testClassService)
    {
        this.studentService = studentService;
        this.testClassService = testClassService;
    }

    //    @PostMapping(path = "/test")
    //    public void addTest(@RequestBody TestClass testClass)
    //    {
    //        testClassService.save(testClass);
    //    }
    //
    //    @GetMapping(path = "/test")
    //    public List<TestClass> test()
    //    {
    //        return testClassService.findAll();
    //    }

    @GetMapping(path = "")
    public List<Student> findAllStudents()
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

    @GetMapping(path = "/company")
    public List<Company> findAllDistinctCompaniesWithJob()
    {
        return studentService.findAllDistinctCompaniesWithJob();
    }

    @GetMapping(path = "/export")
    public ResponseEntity<String> downloadExportFile(HttpServletResponse response)
    {
        try
        {
            studentService.fileDownload(response);
        }
        catch (Exception e)
        {
            System.out.println("Exception" + e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        }
        return ResponseEntity.ok().build();
    }

    @PostMapping(path = "")
    @ResponseBody
    public Student save(@RequestBody Student student)
    {
        Student savedStudent = studentService.save(student);
        if (savedStudent != null)
        {
            return savedStudent;
        }
        return null;
    }

    @DeleteMapping(path = "/{studentId}")
    public void deleteStudent(@PathVariable String studentId)
    {
        studentService.delete(studentId);
    }
}
