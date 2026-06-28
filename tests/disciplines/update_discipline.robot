*** Settings ***
Resource          ../../resources/keywords/discipline_keywords.robot

Suite Setup       Create API Session

*** Test Cases ***
Update Discipline Partitions
    ${cases}=    Get Fixture    resources/fixtures/disciplines_update.json
    FOR    ${case}    IN    @{cases}
        ${plan_id}=    Create Plan And Return Id    Plan For Discipline Update
        ${questions}=    Convert To Integer    7
        ${seed_topics}=    Create List    Kinematics
        ${seed_payload}=    Create Dictionary    name=Physics    topics=${seed_topics}    questionsSolved=${questions}
        ${create_response}=    Create Discipline    ${plan_id}    ${seed_payload}
        Validate Status Code    ${create_response}    201
        ${created}=    Set Variable    ${create_response.json()}

        IF    ${case}[existingDiscipline]
            ${subject_id}=    Set Variable    ${created}[id]
        ELSE
            ${subject_id}=    Set Variable    ${case}[subjectId]
        END

        ${response}=    Update Discipline    ${plan_id}    ${subject_id}    ${case}[payload]

        IF    ${case}[expectedStatus] == 200
            Validate Status Code    ${response}    200
            Validate JSON Header    ${response}
            ${body}=    Set Variable    ${response.json()}
            Should Be Equal    ${body}[name]    ${case}[expectedName]
            Should Be Equal As Integers    ${body}[topicsCount]    ${case}[expectedTopicsCount]
            Should Be Equal As Integers    ${body}[questionsSolved]    ${case}[expectedQuestionsSolved]
        ELSE
            Validate Error Response    ${response}    ${case}[expectedStatus]    ${case}[expectedMessage]
        END
    END
