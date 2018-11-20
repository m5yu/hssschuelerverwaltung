package schule.datenbank.entity;

import java.time.LocalDateTime;

public class Company
{
    private String        job;
    private int           jobNr;
    private String        company;
    private String        zipCode;
    private String        city;
    private String        street;
    private String        email;
    private String        phone;
    private String        instructor;
    private LocalDateTime trainingStart;
    private LocalDateTime trainingEnd;
    private boolean       trainingShortening;
    private Kammer kammer;
}
