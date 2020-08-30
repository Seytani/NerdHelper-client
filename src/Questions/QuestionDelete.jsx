import React, {useState} from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import APIURL from '../helpers/environment';


const QuestionDelete = (props) => {
    const [open, setOpen] = useState(false);

    let handleSubmit = () => {
        setOpen(false);
        fetch(`${APIURL}/question/delete/${props.questionId}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            })
        })
            .then(res => res.json()).then(data => { console.log(data); props.fetchQuestions() })
    }

    return (
        <div>
            <Modal
                basic
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                dimmer='blurring'
                size='small'
                trigger={<Button basic color='red'>Delete</Button>}
                style={{ textAlign: 'center' }}
            >
                <Header icon>
                    <Icon name='trash alternate outline' />
                </Header>
                <Modal.Content>
                    <h3>Are you sure you want to delete this question?</h3>
                </Modal.Content>
                <Modal.Actions style={{ textAlign: 'center' }}>
                    <Button basic color='yellow' inverted onClick={() => setOpen(false)}>
                        <Icon name='remove' /> No
                    </Button>
                    <Button color='red' inverted onClick={handleSubmit}>
                        <Icon name='checkmark' /> Yes, delete
                    </Button>
                </Modal.Actions>
            </Modal>
        </div>
    );
}

export default QuestionDelete;