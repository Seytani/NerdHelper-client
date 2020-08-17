import React, {useState} from 'react';
import { Button } from 'semantic-ui-react';

const ManageQuestions = (props) => {
    const [questions, setQuestions] = useState([]);

    let fetchQuestions = () => {
        let topicId = props.topic.id;
        fetch(`http://localhost:3001/topics/view-topic/${topicId}`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        })
            .then(res => res.json()).then(data => { setQuestions(data); console.log(data) })
    };

    return(
        <div>
            <Button basic color='yellow' onClick={fetchQuestions}>Manage Questions</Button>
        </div>
    );
}

export default ManageQuestions;
