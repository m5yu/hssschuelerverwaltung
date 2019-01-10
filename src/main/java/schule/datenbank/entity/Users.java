package schule.datenbank.entity;

import lombok.Data;

@Data
public class Users
{
    private String username;
    private String password;
    private String role;

    public Users(String username, String password, String role)
    {
        this.username = username;
        this.password = password;
        this.role = role;
    }
}
