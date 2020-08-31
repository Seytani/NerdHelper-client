import React, { useState } from 'react'
import { Input } from 'semantic-ui-react';
import APIURL from '../helpers/environment';


const TopicCreate = (props) => {
    const [topicName, setTopicName] = useState('');

    let handleSubmit = (e) => {
        if(topicName === '') return;
        e.preventDefault();
        fetch(`${APIURL}/topics/add-topic`, {
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
            <Input action={{color: 'black', labelPosition: 'right', icon:'plus', content: 'Add Topic', onClick: handleSubmit}}  
            size ={'big'} onChange={e => setTopicName(e.target.value)} placeholder='Enter New Topic...' />
        </div>
    );
}

export default TopicCreate;