package schule.datenbank.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import schule.datenbank.entity.TestClass;

@Repository
public interface TestClassRepository extends MongoRepository<TestClass, String>
{

}
