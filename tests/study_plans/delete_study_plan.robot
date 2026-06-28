*** Settings ***
Resource          ../../resources/keywords/study_plan_keywords.robot

Suite Setup       Create API Session

*** Test Cases ***
Delete Study Plan Partitions
    ${cases}=    Get Fixture    resources/fixtures/study_plans_delete.json
    FOR    ${case}    IN    @{cases}
        IF    ${case}[existingPlan]
            ${plan_id}=    Create Plan And Return Id    ${case}[initialName]
        ELSE
            ${plan_id}=    Set Variable    ${case}[planId]
        END

        ${response}=    Delete Study Plan    ${plan_id}
        IF    ${case}[expectedStatus] == 204
            Validate Status Code    ${response}    204
            ${get_response}=    Get Study Plan    ${plan_id}
            Validate Error Response    ${get_response}    404    Plan not found
        ELSE
            Validate Error Response    ${response}    ${case}[expectedStatus]    ${case}[expectedMessage]
        END
    END
