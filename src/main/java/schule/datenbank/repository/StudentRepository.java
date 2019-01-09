package schule.datenbank.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import schule.datenbank.entity.Company;
import schule.datenbank.entity.Student;

@Repository
public interface StudentRepository extends MongoRepository<Student, String>
{
    Student findByFirstName(String firstName);

    List<Student> findByLastName(String lastName);

    Optional<Student> findById(String id);

    @Query("{'company.company': ?0, 'company.job': ?1}")
    List<Student> findByCompanyAndJob(String company, String job);
}
