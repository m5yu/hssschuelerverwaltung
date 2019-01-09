package schule.datenbank.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Company
{
    private String  job;
    private int     jobNr;
    private String  company;
    private String  zipCode;
    private String  city;
    private String  street;
    private String  email;
    private String  phone;
    private String  instructor;
    private Kammer  kammer;
}
