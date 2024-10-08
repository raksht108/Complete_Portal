package com.testautomation.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "testcase")
public class TestCase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ProjectId")
    private int projectId;

    @Column(name = "TCID", length = 1000)
    private String tcid;

    @Column(name = "Module", length = 255)
    private String module;

    @Column(name = "Description", length = 4000)
    private String description;

    @Column(name = "Runmode", length = 2)
    private String runmode;

    @Column(name = "Known_Defect", length = 10)
    private String knownDefect;

    @Column(name = "Defect_Status", length = 10)
    private String defectStatus;

    @Column(name = "Remarks", length = 510)
    private String remarks;

    @Column(name = "InsertedDateTime")
    private LocalDateTime insertedDateTime;

    @Column(name = "LastUpdatedDateTime")
    private LocalDateTime lastUpdatedDateTime;

    // Getters and Setters
}
