package schule.datenbank.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import schule.datenbank.entity.Users;
import schule.datenbank.repository.MyUserDetailsRepository;

@Component
public class MyUserDetailsService implements UserDetailsService
{
    private MyUserDetailsRepository myUserDetailsRepository;

    @Autowired
    public MyUserDetailsService(MyUserDetailsRepository myUserDetailsRepository)
    {
        this.myUserDetailsRepository = myUserDetailsRepository;
    }

    //    @Autowired
    //    private MongoClient mongoClient;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException
    {
        Users user = myUserDetailsRepository.findByUsername(username);

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
