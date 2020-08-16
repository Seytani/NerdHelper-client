import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';

const Topics = (props) => {
    const [topics, setTopics] = useState([]);

let fetchTopics = () => {
    fetch('http://localhost:3001/topics/view-all', {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': props.token
        })
    })
    .then(res => res.json()).then(data => {setTopics(data);})
}

useEffect(() => {
    fetchTopics();
}, [])


    return(
        <div>
            Topics Component
            <Button onClick={fetchTopics}>Fetch</Button>
        </div>
    );
}

export default Topics;