import React, { useState } from 'react';
import { Button, Modal, Input, Form } from 'semantic-ui-react'


const QuestionCreate = (props) => {
    const [open, setOpen] = useState(false);
    const [dimmer, setDimmer] = useState('');
    const [question, setQuestion] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [incorrectAnswer_1, setIncorrectAnswer_1] = useState('');
    const [incorrectAnswer_2, setIncorrectAnswer_2] = useState('');
    const [incorrectAnswer_3, setIncorrectAnswer_3] = useState('');

    let handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:3001/question/add', {
            method: 'POST',
            body: JSON.stringify({
                topic_id: props.topic.id,
                question: question,
                correctAnswer: correctAnswer,
                incorrectAnswer_1: incorrectAnswer_1,
                incorrectAnswer_2: incorrectAnswer_2,
                incorrectAnswer_3: incorrectAnswer_3,
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
            <Button basic color='pink' onClick={() => { setOpen(true); setDimmer('blurring') }}>
                Add Question
        </Button>

            <Modal
                size='small'
                dimmer={dimmer}
                open={open}
                onClose={() => setOpen(false)}
            >
                <Modal.Header>Add Question</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Field>
                            <label>Question</label>
                            <Input focus fluid onChange={e => setQuestion(e.target.value)} placeholder='Enter new question' />
                        </Form.Field>
                        <Form.Field>
                            <label>Answer</label>
                            <Input focus fluid onChange={e => setCorrectAnswer(e.target.value)} placeholder='Enter Answer' />
                        </Form.Field>
                        <Form.Field>
                            <label>Incorrect Answers (For Quiz Mode)</label>
                            <Form.Field>
                                <label>1.</label>
                            <Input focus fluid onChange={e => setIncorrectAnswer_1(e.target.value)} placeholder='Enter Incorrect Answer 1' />
                            </Form.Field>
                            <Form.Field>
                                <label>2.</label>
                            <Input focus fluid onChange={e => setIncorrectAnswer_2(e.target.value)} placeholder='Enter Incorrect Answer 2' />
                            </Form.Field>
                            <Form.Field>

                                <label>3.</label>
                            <Input focus fluid onChange={e => setIncorrectAnswer_3(e.target.value)} placeholder='Enter Incorrect Answer 3' />
                            </Form.Field>
                        </Form.Field>
                    </Form>
                </Modal.Content>
                <Modal.Actions>

                    <Button positive onClick={handleSubmit}>
                        Add
            </Button>
                    <Button negative onClick={() => setOpen(false)}>
                        Cancel
            </Button>
                </Modal.Actions>
            </Modal>
        </div>
    );
}

export default QuestionCreate;