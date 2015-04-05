Feature: SiSense Demo

  Scenario: Opening the demo dashboard
    Given I am on the SiSense homepage
    When I go to the "Demo" section
    And I click the "Open Dashboard" button
    Then Eventually the dashboard shows up


  Scenario: Selecting an item on the demo dashboard
    Given I am on the SiSense homepage
    When I go to the "Demo" section
    And I click the "Open Dashboard" button
    And Eventually the dashboard shows up
    And I click the "Webinar" slice in the chart titled "Lead Breakdown By Campaign Source"
    Then The indicators show the following values
      | Indicator title | Value  |
      | TOTAL VISITS    | 26,621 |
      | CONVERTED (%)   | 8.86%  |
      | AVERAGE COST    | $13.85 |
      | QUALIFIED       | 170.00 |