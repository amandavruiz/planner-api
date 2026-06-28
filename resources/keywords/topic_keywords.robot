*** Settings ***
Library           Collections
Resource          common_keywords.robot
Resource          discipline_keywords.robot

*** Keywords ***
Add Topic To Discipline
    [Arguments]    ${plan_id}    ${subject_id}    ${topic_name}
    ${subject}=    Get Subject Details    ${plan_id}    ${subject_id}
    ${new_topics}=    Add Topic Name    ${subject}[topics]    ${topic_name}
    ${payload}=    Create Dictionary    topics=${new_topics}
    ${response}=    Update Discipline    ${plan_id}    ${subject_id}    ${payload}
    RETURN    ${response}

Get Topics From Discipline
    [Arguments]    ${plan_id}    ${subject_id}
    ${subject}=    Get Subject Details    ${plan_id}    ${subject_id}
    RETURN    ${subject}[topics]

Update Topic In Discipline
    [Arguments]    ${plan_id}    ${subject_id}    ${old_name}    ${new_name}
    ${subject}=    Get Subject Details    ${plan_id}    ${subject_id}
    ${topics}=    Replace Topic    ${subject}[topics]    ${old_name}    ${new_name}
    ${payload}=    Create Dictionary    topics=${topics}
    ${response}=    Update Discipline    ${plan_id}    ${subject_id}    ${payload}
    RETURN    ${response}

Delete Topic In Discipline
    [Arguments]    ${plan_id}    ${subject_id}    ${topic_name}
    ${subject}=    Get Subject Details    ${plan_id}    ${subject_id}
    ${topics}=    Remove Topic    ${subject}[topics]    ${topic_name}
    ${payload}=    Create Dictionary    topics=${topics}
    ${response}=    Update Discipline    ${plan_id}    ${subject_id}    ${payload}
    RETURN    ${response}
