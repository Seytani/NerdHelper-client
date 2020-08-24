import React, { useState, createRef } from 'react'
import { Input, Button, Icon } from 'semantic-ui-react';

const TopicCreate = (props) => {
    const [topicName, setTopicName] = useState('');
    let inputRef = createRef();

    let handleClick = () => inputRef.current.focus();
    let handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:3001/topics/add-topic', {
            method: 'POST',
            body: JSON.stringify({ name: topicName }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            })
        })
            .then(res => res.json()).then(data => { setTopicName(data); console.log(data); props.fetchTopics() })
    }

    return (
        <div>
            <Button content='Add Topic' onClick={handleClick} />
            <Input icon={<Icon name='plus' link onClick={handleSubmit} />}
                onChange={e => setTopicName(e.target.value)} ref={inputRef} placeholder='Enter New Topic Name...' />
        </div>
    );
}

export default TopicCreate;