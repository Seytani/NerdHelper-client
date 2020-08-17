import React, {useState} from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

const TopicDelete = (props) => {
    const [open, setOpen] = useState(false);

    let handleSubmit = () => {
        setOpen(false);
        let topicId = props.topic.id;
        fetch(`http://localhost:3001/topics/delete/${topicId}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        })
            .then(res => res.json()).then(data => { console.log(data); props.fetchTopics() })
    }

    return (
        <div>
            <Modal
                basic
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                size='small'
                trigger={<Button>Delete</Button>}
                style={{ textAlign: 'center' }}
            >
                <Header icon>
                    <Icon name='trash alternate outline' />
                </Header>
                <Modal.Content>
                    <h3>This will delete all content associated with this topic.</h3>
                    <h3>Are you sure you want to proceed?</h3>
                </Modal.Content>
                <Modal.Actions style={{ textAlign: 'center' }}>
                    <Button basic color='red' inverted onClick={() => setOpen(false)}>
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

export default TopicDelete;