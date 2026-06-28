*** Settings ***
Resource          ../../resources/keywords/discipline_keywords.robot

Suite Setup       Create API Session

*** Test Cases ***
Delete Discipline Partitions
    ${cases}=    Get Fixture    resources/fixtures/disciplines_delete.json
    FOR    ${case}    IN    @{cases}
        ${plan_id}=    Create Plan And Return Id    Plan For Discipline Delete
        ${questions}=    Convert To Integer    4
        ${seed_topics}=    Create List    Organic
        ${seed_payload}=    Create Dictionary    name=Chemistry    topics=${seed_topics}    questionsSolved=${questions}
        ${create_response}=    Create Discipline    ${plan_id}    ${seed_payload}
        Validate Status Code    ${create_response}    201
        ${created}=    Set Variable    ${create_response.json()}

        IF    ${case}[existingDiscipline]
            ${subject_id}=    Set Variable    ${created}[id]
        ELSE
            ${subject_id}=    Set Variable    ${case}[subjectId]
        END

        ${response}=    Delete Discipline    ${plan_id}    ${subject_id}

        IF    ${case}[expectedStatus] == 204
            Validate Status Code    ${response}    204
            ${get_response}=    Get Discipline    ${plan_id}    ${subject_id}
            Validate Error Response    ${get_response}    404    Subject not found for this plan
        ELSE
            Validate Error Response    ${response}    ${case}[expectedStatus]    ${case}[expectedMessage]
        END
    END
