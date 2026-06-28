*** Settings ***
Resource          ../../resources/keywords/discipline_keywords.robot
Resource          ../../resources/keywords/study_plan_keywords.robot

Suite Setup       Create API Session

*** Test Cases ***
Create Discipline Partitions
    ${cases}=    Get Fixture    resources/fixtures/disciplines_create.json
    FOR    ${case}    IN    @{cases}
        ${plan_id}=    Create Plan And Return Id    Plan For Discipline Create
        ${response}=    Create Discipline    ${plan_id}    ${case}[payload]

        IF    ${case}[expectedStatus] == 201
            Validate Status Code    ${response}    201
            Validate JSON Header    ${response}
            ${body}=    Set Variable    ${response.json()}
            Assert Response Keys    ${body}    ${{["id", "name", "topics", "topicsCount", "questionsSolved"]}}
            Should Be Equal    ${body}[name]    ${case}[expectedName]
            Should Be Equal As Integers    ${body}[topicsCount]    ${case}[expectedTopicsCount]
            Should Be Equal As Integers    ${body}[questionsSolved]    ${case}[expectedQuestionsSolved]

            ${plan_response}=    Get Study Plan    ${plan_id}
            Validate Status Code    ${plan_response}    200
            ${plan_body}=    Set Variable    ${plan_response.json()}
            Should Be Equal As Integers    ${plan_body}[subjectsCount]    1
        ELSE
            Validate Error Response    ${response}    ${case}[expectedStatus]    ${case}[expectedMessage]
        END
    END
