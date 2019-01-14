package schule.datenbank.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import schule.datenbank.entity.Users;

public interface MyUserDetailsRepository extends MongoRepository<Users, String>
{
    Users findByUsername(String username);
}