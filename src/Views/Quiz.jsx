import React, { useState, useEffect } from 'react';
import { Reveal, Button, Grid } from 'semantic-ui-react'
import { useLocation, useHistory } from 'react-router-dom';
import APIURL from '../helpers/environment';

const Quiz = (props) => {
    const [questions, setQuestions] = useState([]);
    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        console.log('FROM QUIZ', location.topic.id)
        fetchQuestions();
    }, [])

    const fetchQuestions = () => {
        fetch(`${APIURL}/topics/view-topic/${location.topic.id}`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            })
        })
            .then(res => res.json()).then(data => { scramble(data.questions) })
    }

    const goBack = () => {
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

    let scramble = q => {
        let indexes = generateIndexes(q.length)
        let temp = [];
        for (let index of indexes) {
            temp.push(q[index]);
        }
        setQuestions(temp);
    }

    return(
        <div>
            
        </div>
    );
}

export default Quiz;
