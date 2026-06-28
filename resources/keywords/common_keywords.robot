*** Settings ***
Library           RequestsLibrary
Library           Collections
Library           BuiltIn
Library           OperatingSystem
Resource          ../variables/env.robot

*** Keywords ***
Create API Session
    Create Session    planner    ${BASE_URL}    headers=${DEFAULT_HEADERS}    disable_warnings=1

Load Fixture From JSON
    [Arguments]    ${fixture_relative_path}
    ${content}=    Get File    ${fixture_relative_path}
    ${fixture}=    Evaluate    __import__('json').loads($content)
    RETURN    ${fixture}

Assert JSON Content Type
    [Arguments]    ${response}
    ${content_type}=    Get From Dictionary    ${response.headers}    Content-Type
    Should Contain    ${content_type}    application/json

Assert Response Keys
    [Arguments]    ${response_body}    ${expected_keys}
    FOR    ${key}    IN    @{expected_keys}
        Dictionary Should Contain Key    ${response_body}    ${key}
    END

Add Topic Name
    [Arguments]    ${topics}    ${topic_name}
    ${result}=    Copy List    ${topics}
    Run Keyword If    '${topic_name}' != ''    Append To List    ${result}    ${topic_name}
    RETURN    ${result}

Replace Topic
    [Arguments]    ${topics}    ${old_name}    ${new_name}
    ${result}=    Copy List    ${topics}
    ${index}=    Get Index From List    ${result}    ${old_name}
    Set List Value    ${result}    ${index}    ${new_name}
    RETURN    ${result}

Remove Topic
    [Arguments]    ${topics}    ${topic_name}
    ${result}=    Copy List    ${topics}
    Remove Values From List    ${result}    ${topic_name}
    RETURN    ${result}

Assert Topic Exists
    [Arguments]    ${topics}    ${topic_name}
    List Should Contain Value    ${topics}    ${topic_name}

Assert Topic Does Not Exist
    [Arguments]    ${topics}    ${topic_name}
    List Should Not Contain Value    ${topics}    ${topic_name}

Get Fixture
    [Arguments]    ${fixture_relative_path}
    ${fixture}=    Load Fixture From JSON    ${fixture_relative_path}
    RETURN    ${fixture}

Validate Status Code
    [Arguments]    ${response}    ${expected_status}
    Should Be Equal As Integers    ${response.status_code}    ${expected_status}

Validate JSON Header
    [Arguments]    ${response}
    Assert JSON Content Type    ${response}

Validate Error Response
    [Arguments]    ${response}    ${expected_status}    ${expected_message}
    Validate Status Code    ${response}    ${expected_status}
    Validate JSON Header    ${response}
    ${body}=    Set Variable    ${response.json()}
    Assert Response Keys    ${body}    ${{["status", "error", "message"]}}
    Should Be Equal As Integers    ${body}[status]    ${expected_status}
    Should Be Equal    ${body}[message]    ${expected_message}

Create Plan And Return Id
    [Arguments]    ${plan_name}=Plan for Tests
    ${payload}=    Create Dictionary    name=${plan_name}
    ${response}=    POST On Session    planner    ${API_PREFIX}    json=${payload}
    Validate Status Code    ${response}    201
    Validate JSON Header    ${response}
    ${body}=    Set Variable    ${response.json()}
    RETURN    ${body}[id]

Create Plan And Discipline
    [Arguments]    ${plan_name}=Plan with Discipline    ${discipline_name}=Physics
    ${plan_id}=    Create Plan And Return Id    ${plan_name}
    ${topics}=    Create List
    ${payload}=    Create Dictionary    name=${discipline_name}    topics=${topics}
    ${response}=    POST On Session    planner    ${API_PREFIX}/${plan_id}/subjects    json=${payload}
    Validate Status Code    ${response}    201
    ${subject}=    Set Variable    ${response.json()}
    RETURN    ${plan_id}    ${subject}[id]

Get Subject Details
    [Arguments]    ${plan_id}    ${subject_id}
    ${response}=    GET On Session    planner    ${API_PREFIX}/${plan_id}/subjects/${subject_id}
    Validate Status Code    ${response}    200
    Validate JSON Header    ${response}
    RETURN    ${response.json()}
