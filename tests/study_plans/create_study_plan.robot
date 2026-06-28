*** Settings ***
Resource          ../../resources/keywords/study_plan_keywords.robot

Suite Setup       Create API Session

*** Test Cases ***
Create Study Plan Partitions
    ${cases}=    Get Fixture    resources/fixtures/study_plans_create.json
    FOR    ${case}    IN    @{cases}
        ${response}=    Create Study Plan    ${case}[payload]
        IF    ${case}[expectedStatus] == 201
            Validate Status Code    ${response}    201
            Validate JSON Header    ${response}
            ${body}=    Set Variable    ${response.json()}
            Assert Response Keys    ${body}    ${{["id", "name", "totalHoursStudied", "subjectsCount", "subjects"]}}
            Should Be Equal    ${body}[name]    ${case}[expectedName]
            Should Be Equal As Integers    ${body}[subjectsCount]    0
            Should Be Equal As Numbers    ${body}[totalHoursStudied]    0
        ELSE
            Validate Error Response    ${response}    ${case}[expectedStatus]    ${case}[expectedMessage]
        END
    END
