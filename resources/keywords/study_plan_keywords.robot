*** Settings ***
Library           Collections
Resource          common_keywords.robot

*** Keywords ***
Create Study Plan
    [Arguments]    ${payload}
    ${response}=    POST On Session    planner    ${API_PREFIX}    json=${payload}    expected_status=any
    RETURN    ${response}

Get Study Plan
    [Arguments]    ${plan_id}
    ${response}=    GET On Session    planner    ${API_PREFIX}/${plan_id}    expected_status=any
    RETURN    ${response}

Update Study Plan
    [Arguments]    ${plan_id}    ${payload}
    ${response}=    PUT On Session    planner    ${API_PREFIX}/${plan_id}    json=${payload}    expected_status=any
    RETURN    ${response}

Delete Study Plan
    [Arguments]    ${plan_id}
    ${response}=    DELETE On Session    planner    ${API_PREFIX}/${plan_id}    expected_status=any
    RETURN    ${response}

Create Session In Plan
    [Arguments]    ${plan_id}    ${payload}
    ${response}=    POST On Session    planner    ${API_PREFIX}/${plan_id}/progress/sessions    json=${payload}
    RETURN    ${response}

Get Plan Progress
    [Arguments]    ${plan_id}    ${period}=daily    ${date}=2026-06-24
    ${query}=    Create Dictionary    period=${period}    date=${date}
    ${response}=    GET On Session    planner    ${API_PREFIX}/${plan_id}/progress    params=${query}    expected_status=any
    RETURN    ${response}
