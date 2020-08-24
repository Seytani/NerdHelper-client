import React, { useState } from 'react';
import { Button, Modal, Input, Form } from 'semantic-ui-react'


const QuestionUpdate = (props) => {
    const [open, setOpen] = useState(false);
    const [dimmer, setDimmer] = useState('');
    const [newQuestion, setNewQuestion] = useState('');
    const [newCorrectAnswer, setNewCorrectAnswer] = useState('');
    const [newIncorrectAnswers, setNewIncorrectAnswers] = useState({1: '', 2: '', 3: ''});
    const [inReview, setInReview] = useState(props.question.review);


    let handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:3001/question/edit/${props.question.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                question: newQuestion,
                correctAnswer: newCorrectAnswer,
                incorrectAnswers: newIncorrectAnswers,
                review: inReview

            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            })
        })
            .then(res => res.json()).then(data => {setOpen(false); props.fetchQuestions();})
    }

    return (
        <div>
            <Button basic color='blue' onClick={() => { setOpen(true); setDimmer('blurring') }}>
                Edit Question
        </Button>

            <Modal
                size='small'
                dimmer={dimmer}
                open={open}
                onClose={() => setOpen(false)}
            >
                <Modal.Header>Edit Question</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Field>
                            <label>Question</label>
                            <Input focus fluid defaultValue={props.question.question} onChange={e => setNewQuestion(e.target.value)} placeholder='Enter new question' />
                        </Form.Field>
                        <Form.Field>
                            <label>Answer</label>
                            <Input focus fluid defaultValue={props.question.correctAnswer} onChange={e => setNewCorrectAnswer(e.target.value)} placeholder='Enter Answer' />
                        </Form.Field>
                        <Form.Field>
                            <label>Incorrect Answers (For Quiz Mode)</label>
                            <Form.Group inline>
                                <label>1.</label>
                            <Input focus fluid defaultValue={props.question.incorrectAnswers[1]} onChange={e => setNewIncorrectAnswers({...newIncorrectAnswers, 1: e.target.value})} placeholder='Enter Incorrect Answer 1' />
                                <label>2.</label>
                            <Input focus fluid defaultValue={props.question.incorrectAnswers[2]} onChange={e => setNewIncorrectAnswers({...newIncorrectAnswers, 2: e.target.value})} placeholder='Enter Incorrect Answer 2' />
                                <label>3.</label>
                            <Input focus fluid defaultValue={props.question.incorrectAnswers[3]} onChange={e => setNewIncorrectAnswers({...newIncorrectAnswers, 3: e.target.value})} placeholder='Enter Incorrect Answer 3' />
                            </Form.Group>
                            <Form.Checkbox label='In Review List' defaultChecked={props.question.review} onClick={e => {setInReview(!inReview);}} />
                        </Form.Field>
                    </Form>
                </Modal.Content>
                <Modal.Actions>

                    <Button positive onClick={handleSubmit}>
                        Save
            </Button>
                    <Button negative onClick={() => setOpen(false)}>
                        Cancel
            </Button>
                </Modal.Actions>
            </Modal>
        </div>
    );
}

export default QuestionUpdate;