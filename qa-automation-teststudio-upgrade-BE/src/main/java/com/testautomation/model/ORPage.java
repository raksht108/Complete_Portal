package com.testautomation.model;

import jakarta.persistence.*;

@Entity
@Table(name = "_tblor")
public class ORPage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ElementName")  // 
    private String orPageName;

    // Getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOrPageName() {
        return orPageName;
    }

    public void setOrPageName(String orPageName) {
        this.orPageName = orPageName;
    }
}
