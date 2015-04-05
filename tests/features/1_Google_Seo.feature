Feature: Google SEO

  Scenario: Search for "BI big data wizards" on google and click on the SiSense link
    Given I am on google's search page
    When I search for "BI tool for data wizards"
    Then I should see the following result in the "1"-st place
      | Caption                                                  | Link             | Text |
      | Sisense: Business Intelligence Analytics & Dashboard ... | www.sisense.com/ | Business intelligence for data wizards. The only business intelligence and dashboard software that lets you join, analyze, and visualize all the data you want. |
    And I click on the "1"-st result link
    And I should be directed to the address "http://www.sisense.com/"

  Scenario: Click on the first result for "BI tool for data wizards" on google
    Given I am on google's search page
    When I search for "BI tool for data wizards"
    And I click on the "1"-st result link
    Then I should be directed to the address "http://www.sisense.com/"