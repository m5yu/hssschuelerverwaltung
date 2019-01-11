package schule.datenbank.service;

import com.mongodb.MongoClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import schule.datenbank.entity.Users;
import schule.datenbank.repository.MongoUserRepository;

@Component
public class MyUserDetailsService implements UserDetailsService
{
    @Autowired
    private MongoUserRepository repository;

    @Autowired
    private MongoClient mongoClient;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException
    {
        Users user = repository.findByUsername(username);

        if (user == null)
        {
            throw new UsernameNotFoundException("User not found by name: " + username);
        }
        return toUserDetails(user);
    }

    private UserDetails toUserDetails(Users userObject)
    {
        return User.withUsername(userObject.getUsername())
                .password(userObject.getPassword())
                .roles(userObject.getRole()).build();
    }
}
