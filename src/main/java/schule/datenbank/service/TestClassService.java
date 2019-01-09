package schule.datenbank.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import schule.datenbank.entity.TestClass;
import schule.datenbank.repository.TestClassRepository;

@Service
public class TestClassService
{
    private final TestClassRepository testClassRepository;

    @Autowired
    public TestClassService(TestClassRepository testClassRepository)
    {
        this.testClassRepository = testClassRepository;
    }

    public List<TestClass> findAll()
    {
        return testClassRepository.findAll();
    }

    public void save(TestClass testClass)
    {
        testClassRepository.save(testClass);
    }
}
