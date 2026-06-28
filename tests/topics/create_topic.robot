*** Settings ***
Resource          ../../resources/keywords/topic_keywords.robot

Suite Setup       Create API Session

*** Test Cases ***
Create Topic Partitions
    ${cases}=    Get Fixture    resources/fixtures/topics_create.json
    FOR    ${case}    IN    @{cases}
        ${plan_id}=    Create Plan And Return Id    Plan For Topic Create
        ${base_topics}=    Create List    Algebra
        ${questions}=    Convert To Integer    3
        ${seed_payload}=    Create Dictionary    name=Math    topics=${base_topics}    questionsSolved=${questions}
        ${create_subject}=    Create Discipline    ${plan_id}    ${seed_payload}
        Validate Status Code    ${create_subject}    201
        ${subject}=    Set Variable    ${create_subject.json()}

        ${response}=    Add Topic To Discipline    ${plan_id}    ${subject}[id]    ${case}[topicName]
        Validate Status Code    ${response}    ${case}[expectedStatus]
        Validate JSON Header    ${response}
        ${body}=    Set Variable    ${response.json()}
        Should Be Equal As Integers    ${body}[topicsCount]    ${case}[expectedTopicsCount]
        ${topic_name}=    Set Variable    ${case}[topicName]
        Run Keyword If    '${topic_name}' != ''    Assert Topic Exists    ${body}[topics]    ${topic_name}
    END
