package com.testautomation.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.testautomation.model.ORPage;
import com.testautomation.repository.ORPageRepository;

@Service
public class ORPageService {

    @Autowired
    private ORPageRepository orPageRepository;

    public Page<ORPage> getPagedORPages(int page, int size) {
        return orPageRepository.findAll(PageRequest.of(page, size));
    }
}
