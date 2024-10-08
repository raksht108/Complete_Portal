package com.testautomation.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.testautomation.model.ORPage;

public interface ORPageRepository extends JpaRepository<ORPage, Long> {

    // Correct JPQL query, referring to the entity and selecting ElementName
    @Query("select distinct orPageName from ORPage where orPageName is not null order by orPageName asc")
    Page<String> findDistinctElementNames(Pageable pageable);  // Change return type to Page<String>

 //   @Query("select orPageName from ORPage where orPageName like '%:searchTerm%' order by orPageName asc")
 //   Page<ORPage> searchORPagesByElementName(String searchTerm, Pageable pageable);
}
