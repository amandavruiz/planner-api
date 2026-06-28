*** Settings ***
Resource          ../../resources/keywords/topic_keywords.robot

Suite Setup       Create API Session

*** Test Cases ***
Update Topic Scenario
    ${cases}=    Get Fixture    resources/fixtures/topics_update.json
    FOR    ${case}    IN    @{cases}
        ${plan_id}=    Create Plan And Return Id    Plan For Topic Update
        ${seed_topics}=    Create List    ${case}[oldTopic]    Cartography
        ${questions}=    Convert To Integer    6
        ${seed_payload}=    Create Dictionary    name=Geography    topics=${seed_topics}    questionsSolved=${questions}
        ${create_subject}=    Create Discipline    ${plan_id}    ${seed_payload}
        Validate Status Code    ${create_subject}    201
        ${subject}=    Set Variable    ${create_subject.json()}

        ${response}=    Update Topic In Discipline    ${plan_id}    ${subject}[id]    ${case}[oldTopic]    ${case}[newTopic]
        Validate Status Code    ${response}    ${case}[expectedStatus]
        Validate JSON Header    ${response}
        ${body}=    Set Variable    ${response.json()}
        Should Be Equal As Integers    ${body}[topicsCount]    ${case}[expectedTopicsCount]
        Assert Topic Exists    ${body}[topics]    ${case}[newTopic]
        Assert Topic Does Not Exist    ${body}[topics]    ${case}[oldTopic]
    END
