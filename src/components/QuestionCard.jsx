import React from 'react';
import { Card } from 'semantic-ui-react';
import QuestionDelete from './QuestionDelete';
import QuestionUpdate from './QuestionUpdate';

const QuestionCard = props => {


    return (
        <div>
            <Card style={{ margin: '2em', width: '90%', padding: '2em' }}>
                <Card.Header> <h3>{props.question.question}</h3> </Card.Header>
                <Card.Description>
                    <h4>Answer</h4>
                    <p>{props.question.correctAnswer}</p>
                    <h4>Incorrect Answers (For Quiz Mode)</h4>
                    <p>{`1. ${props.question.incorrectAnswer_1}`}</p>
                    <p>{`2. ${props.question.incorrectAnswer_2}`}</p>
                    <p>{`3. ${props.question.incorrectAnswer_3}`}</p>
                </Card.Description>
                <QuestionUpdate question={props.question} fetchQuestions={props.fetchQuestions}/>
                <QuestionDelete questionId={props.question.id} fetchQuestions={props.fetchQuestions}/>
            </Card>
        </div>
    )
}

export default QuestionCard;