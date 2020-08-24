import React, { useState } from 'react';
import { Button, Modal, Input } from 'semantic-ui-react'


const TopicUpdate = (props) => {
    const [open, setOpen] = useState(false);
    const [dimmer, setDimmer] = useState('');
    const [newTopicName, setNewTopicName] = useState('');

    let handleSubmit = () => {
        setOpen(false);
        let topicId = props.topic.id;
        fetch(`http://localhost:3001/topics/edit/${topicId}`, {
            method: 'PUT',
            body: JSON.stringify({ name: newTopicName }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        })
            .then(res => res.json()).then(data => { setNewTopicName(data); console.log(data); props.fetchTopics() })
    }

    return (
        <div>
            <Button basic color='pink' onClick={() => { setOpen(true); setDimmer('blurring') }}>
                Rename
        </Button>

            <Modal
                size='mini'
                dimmer={dimmer}
                open={open}
                onClose={() => setOpen(false)}
            >
                <Modal.Header>Rename Topic</Modal.Header>
                <Modal.Content>
                    <Input focus fluid onChange={e => setNewTopicName(e.target.value)} placeholder='Enter new name' />
                </Modal.Content>
                <Modal.Actions>

                    <Button positive onClick={handleSubmit}>
                        Rename
            </Button>
                    <Button negative onClick={() => setOpen(false)}>
                        Cancel
            </Button>
                </Modal.Actions>
            </Modal>
        </div>
    );
}

export default TopicUpdate;