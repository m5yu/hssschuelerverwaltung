package schule.datenbank.controller;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import schule.datenbank.entity.Company;
import schule.datenbank.entity.Student;
import schule.datenbank.entity.User;
import schule.datenbank.service.StudentService;

@RestController
@CrossOrigin
@RequestMapping(path = "/schule")
public class Controller
{
    private StudentService studentService;

    @Autowired
    public Controller(StudentService studentService)
    {
        this.studentService = studentService;
    }

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

    @GetMapping(path = "/success")
    public String success()
    {
        return "Success";
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

    @PostMapping(path = "/login")
    public ResponseEntity<String> login(@RequestBody User user)
    {
        return null;

        //        if (user.getUsername().equals("admin") && user.getPassword().equals("admin"))
        //        {
        //            return ResponseEntity.ok().build();
        //        }
        //        return ResponseEntity
        //                .status(HttpStatus.UNAUTHORIZED)
        //                .body("Zugriff verweigert!");
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
