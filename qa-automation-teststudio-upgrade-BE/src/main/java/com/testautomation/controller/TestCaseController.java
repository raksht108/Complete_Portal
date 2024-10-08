package com.testautomation.controller;

import com.testautomation.model.TestCase;
import com.testautomation.service.TestCaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/testcases")
public class TestCaseController {

    @Autowired
    private TestCaseService testCaseService;

    @PostMapping("/create")
    public ResponseEntity<TestCase> createTestCase(@RequestBody TestCase testCase) {
        TestCase savedTestCase = testCaseService.saveTestCase(testCase);
        return ResponseEntity.ok(savedTestCase);
    }

    @GetMapping("/all")
    public List<TestCase> getAllTestCases() {
        return testCaseService.getAllTestCases();
    }
}
