*** Settings ***
Resource          ../../resources/keywords/study_plan_keywords.robot

Suite Setup       Create API Session

*** Test Cases ***
Get Study Plan Partitions And Business Rules
    ${cases}=    Get Fixture    resources/fixtures/study_plans_get.json
    FOR    ${case}    IN    @{cases}
        IF    ${case}[existingPlan]
            ${plan_id}=    Create Plan And Return Id    ${case}[expectedName]
            ${session_1}=    Create Dictionary    date=2026-06-24    durationHours=1.5
            ${session_2}=    Create Dictionary    date=2026-06-24    durationHours=2
            ${session_response_1}=    Create Session In Plan    ${plan_id}    ${session_1}
            ${session_response_2}=    Create Session In Plan    ${plan_id}    ${session_2}
            Validate Status Code    ${session_response_1}    201
            Validate Status Code    ${session_response_2}    201
            ${response}=    Get Study Plan    ${plan_id}
            Validate Status Code    ${response}    200
            Validate JSON Header    ${response}
            ${body}=    Set Variable    ${response.json()}
            Assert Response Keys    ${body}    ${{["id", "name", "totalHoursStudied", "subjectsCount", "subjects", "sessionsCount"]}}
            Should Be Equal    ${body}[name]    ${case}[expectedName]
            Should Be Equal As Numbers    ${body}[totalHoursStudied]    3.5
            Should Be Equal As Integers    ${body}[sessionsCount]    2
            ${progress}=    Get Plan Progress    ${plan_id}    daily    2026-06-24
            Validate Status Code    ${progress}    200
            ${progress_body}=    Set Variable    ${progress.json()}
            Should Be Equal As Numbers    ${progress_body}[totalHoursStudied]    3.5
            Should Be Equal As Integers    ${progress_body}[sessionsCount]    2
        ELSE
            ${response}=    Get Study Plan    ${case}[planId]
            Validate Error Response    ${response}    ${case}[expectedStatus]    ${case}[expectedMessage]
        END
    END
