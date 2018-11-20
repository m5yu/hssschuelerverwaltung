package schule.datenbank.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import schule.datenbank.entity.Student;

@Repository
public interface StudentRepository extends MongoRepository<Student, String>
{
    Student findByFirstName(String firstName);

    List<Student> findByLastName(String lastName);

    Student findById(String id);
}
