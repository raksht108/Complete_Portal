package com.testautomation.service;

import com.testautomation.model.TestCase;
import com.testautomation.repository.TestCaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TestCaseService {

    @Autowired
    private TestCaseRepository testCaseRepository;

    public TestCase saveTestCase(TestCase testCase) {
        return testCaseRepository.save(testCase);
    }

    public List<TestCase> getAllTestCases() {
        return testCaseRepository.findAll();
    }
}
