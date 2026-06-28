*** Settings ***
Resource          ../../resources/keywords/study_plan_keywords.robot

Suite Setup       Create API Session

*** Test Cases ***
Update Study Plan Partitions
    ${cases}=    Get Fixture    resources/fixtures/study_plans_update.json
    FOR    ${case}    IN    @{cases}
        IF    ${case}[existingPlan]
            ${plan_id}=    Create Plan And Return Id    ${case}[initialName]
        ELSE
            ${plan_id}=    Set Variable    ${case}[planId]
        END

        ${response}=    Update Study Plan    ${plan_id}    ${case}[payload]
        IF    ${case}[expectedStatus] == 200
            Validate Status Code    ${response}    200
            Validate JSON Header    ${response}
            ${body}=    Set Variable    ${response.json()}
            Should Be Equal    ${body}[name]    ${case}[expectedName]
        ELSE
            Validate Error Response    ${response}    ${case}[expectedStatus]    ${case}[expectedMessage]
        END
    END
