import React, { useState, useEffect } from 'react';
import { Reveal, Card } from 'semantic-ui-react'
import { useLocation, useHistory } from 'react-router-dom';


const Flashcard = (props) => {
    const [questions, setQuestions] = useState([]);
    const location = useLocation();
    const history = useHistory();

    useEffect( () => {
        console.log('FROM FLASHCARD', location.topic.id)
        fetchQuestions();
        scramble(questions);
    }, [])

    const fetchQuestions = () => {
        fetch(`http://localhost:3001/topics/view-topic/${location.topic.id}`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            })
        })
            .then(res => res.json()).then(data => { setQuestions(data.questions) })
    }

    const goBack = () =>  {
        history.goBack();
    }

    let generateIndexes = (max) => {
        let randomIndex, indexes = [];
        do {
            do {
                randomIndex = Math.floor(Math.random() * Math.floor(max));
            } while (indexes.includes(randomIndex));
            indexes.push(randomIndex);
        } while (indexes.length < max);
        return indexes;
    }
    
    let scramble = questions => {
        let indexes = generateIndexes(questions.length)
        let temp = [];
        for(let index of indexes) {
            temp.push(questions[index]);
        }
        setQuestions(temp);
    }

    return (
        <div style={{textAlign:'center'}}>
        {questions.map(element => ( //does not work, out of scope
            <Card>
            <h1>location.topic.name</h1>
            <h3>Hover to see the answer</h3>
        <Reveal animated='move right'>
            <Reveal.Content visible>
                <p>element.question</p>
            </Reveal.Content>
            <Reveal.Content hidden>
                <p>element.correctAnswer</p>
            </Reveal.Content>
        </Reveal>
        </Card>
    ))}
        </div>
    );
}

export default Flashcard;