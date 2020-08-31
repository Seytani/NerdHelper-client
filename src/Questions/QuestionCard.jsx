import React from 'react';
import { Card } from 'semantic-ui-react';
import QuestionDelete from '../Questions/QuestionDelete';
import QuestionUpdate from '../Questions/QuestionUpdate';

const QuestionCard = props => {


    return (
        <div>
            <Card style={{ margin: '2em', width: '90%', padding: '2em' }}>
                <Card.Header> <h3 className='question'>{props.question.question}</h3> </Card.Header>
                <div className='questionCardDescription'>
                    <Card.Description>
                        <h4 className='questionAnswer'>Answer</h4>
                        <p>{props.question.correctAnswer}</p>
                        <h4>Incorrect Answers (For Quiz Mode)</h4>
                        <p>{`1. ${props.question.incorrectAnswer_1}`}</p>
                        <p>{`2. ${props.question.incorrectAnswer_2}`}</p>
                        <p>{`3. ${props.question.incorrectAnswer_3}`}</p>
                    </Card.Description>
                <div>
                    <Card.Description>
                        <div style={{display: 'flex'}}>
                        <h4 style={{marginRight: '0.5em'}}>In Review:</h4>
                    <p>{props.question.review ? 'Yes' : 'No'}</p>
                    </div>
                    </Card.Description>
                </div>
                </div>
                <Card.Content extra>
                    <div className='questionControls'>
                        <QuestionUpdate question={props.question} fetchQuestions={props.fetchQuestions} />
                        <QuestionDelete questionId={props.question.id} fetchQuestions={props.fetchQuestions} />
                    </div>
                </Card.Content>
            </Card>
        </div>
    )
}

export default QuestionCard;