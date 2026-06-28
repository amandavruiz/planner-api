*** Settings ***
Resource          ../../resources/keywords/topic_keywords.robot

Suite Setup       Create API Session

*** Test Cases ***
Delete Topic Scenario
    ${cases}=    Get Fixture    resources/fixtures/topics_delete.json
    FOR    ${case}    IN    @{cases}
        ${plan_id}=    Create Plan And Return Id    Plan For Topic Delete
        ${seed_topics}=    Create List    ${case}[topicName]    Grammar
        ${questions}=    Convert To Integer    8
        ${seed_payload}=    Create Dictionary    name=Languages    topics=${seed_topics}    questionsSolved=${questions}
        ${create_subject}=    Create Discipline    ${plan_id}    ${seed_payload}
        Validate Status Code    ${create_subject}    201
        ${subject}=    Set Variable    ${create_subject.json()}

        ${response}=    Delete Topic In Discipline    ${plan_id}    ${subject}[id]    ${case}[topicName]
        Validate Status Code    ${response}    ${case}[expectedStatus]
        Validate JSON Header    ${response}
        ${body}=    Set Variable    ${response.json()}
        Should Be Equal As Integers    ${body}[topicsCount]    ${case}[expectedTopicsCount]
        Assert Topic Does Not Exist    ${body}[topics]    ${case}[topicName]
    END
