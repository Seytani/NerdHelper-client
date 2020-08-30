import React, { useState } from 'react';
import { Button, Modal, Input, Form } from 'semantic-ui-react'
import APIURL from '../helpers/environment';


const QuestionUpdate = (props) => {
    const [open, setOpen] = useState(false);
    const [dimmer, setDimmer] = useState('');
    const [newQuestion, setNewQuestion] = useState(props.question.question);
    const [newCorrectAnswer, setNewCorrectAnswer] = useState(props.question.correctAnswer);
    const [newIncorrectAnswer_1, setNewIncorrectAnswer_1] = useState(props.question.incorrectAnswer_1);
    const [newIncorrectAnswer_2, setNewIncorrectAnswer_2] = useState(props.question.incorrectAnswer_2);
    const [newIncorrectAnswer_3, setNewIncorrectAnswer_3] = useState(props.question.incorrectAnswer_3);
    const [inReview, setInReview] = useState(props.question.review);


    let handleSubmit = (e) => {
        e.preventDefault();
        fetch(`${APIURL}/question/edit/${props.question.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                question: newQuestion,
                correctAnswer: newCorrectAnswer,
                incorrectAnswer_1: newIncorrectAnswer_1,
                incorrectAnswer_2: newIncorrectAnswer_2,
                incorrectAnswer_3: newIncorrectAnswer_3,
                review: inReview

            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            })
        })
            .then(res => res.json()).then(data => { setOpen(false); props.fetchQuestions(); })
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
                            <Form.Field >
                                <label>1.</label>
                                <Input focus fluid defaultValue={newIncorrectAnswer_1} onChange={e => setNewIncorrectAnswer_1(e.target.value)} placeholder='Enter Incorrect Answer 1' />
                            </Form.Field>
                            <Form.Field >
                                <label>2.</label>
                                <Input focus fluid defaultValue={props.question.incorrectAnswer_2} onChange={e => setNewIncorrectAnswer_2(e.target.value)} placeholder='Enter Incorrect Answer 2' />
                            </Form.Field>
                            <Form.Field >
                                <label>3.</label>
                                <Input focus fluid defaultValue={props.question.incorrectAnswer_3} onChange={e => setNewIncorrectAnswer_3(e.target.value)} placeholder='Enter Incorrect Answer 3' />
                            </Form.Field>
                            <Form.Checkbox label='In Review List' defaultChecked={props.question.review} onClick={e => { setInReview(!inReview); }} />
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