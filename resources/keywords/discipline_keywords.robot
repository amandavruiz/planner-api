*** Settings ***
Resource          common_keywords.robot

*** Keywords ***
Create Discipline
    [Arguments]    ${plan_id}    ${payload}
    ${response}=    POST On Session    planner    ${API_PREFIX}/${plan_id}/subjects    json=${payload}    expected_status=any
    RETURN    ${response}

Get Discipline
    [Arguments]    ${plan_id}    ${subject_id}
    ${response}=    GET On Session    planner    ${API_PREFIX}/${plan_id}/subjects/${subject_id}    expected_status=any
    RETURN    ${response}

Update Discipline
    [Arguments]    ${plan_id}    ${subject_id}    ${payload}
    ${response}=    PUT On Session    planner    ${API_PREFIX}/${plan_id}/subjects/${subject_id}    json=${payload}    expected_status=any
    RETURN    ${response}

Delete Discipline
    [Arguments]    ${plan_id}    ${subject_id}
    ${response}=    DELETE On Session    planner    ${API_PREFIX}/${plan_id}/subjects/${subject_id}    expected_status=any
    RETURN    ${response}
