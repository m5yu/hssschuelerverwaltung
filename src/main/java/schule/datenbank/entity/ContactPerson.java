package schule.datenbank.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ContactPerson
{
    private ContactPersonType type;
    private String firstName;
    private String lastName;
    private String zipCode;
    private String city;
    private String street;
    private String email;
    private String phone;
}
