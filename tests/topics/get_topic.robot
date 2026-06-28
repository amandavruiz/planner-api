*** Settings ***
Resource          ../../resources/keywords/topic_keywords.robot

Suite Setup       Create API Session

*** Test Cases ***
Get Topic Scenario
    ${cases}=    Get Fixture    resources/fixtures/topics_get.json
    FOR    ${case}    IN    @{cases}
        ${plan_id}=    Create Plan And Return Id    Plan For Topic Get
        ${seed_topics}=    Create List    ${case}[topicName]
        ${questions}=    Convert To Integer    2
        ${seed_payload}=    Create Dictionary    name=Biology    topics=${seed_topics}    questionsSolved=${questions}
        ${create_subject}=    Create Discipline    ${plan_id}    ${seed_payload}
        Validate Status Code    ${create_subject}    201
        ${subject}=    Set Variable    ${create_subject.json()}

        ${topics}=    Get Topics From Discipline    ${plan_id}    ${subject}[id]
        Assert Topic Exists    ${topics}    ${case}[topicName]
    END
