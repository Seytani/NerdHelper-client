import React, { useState, useEffect } from 'react';
import { Reveal, Button, Grid } from 'semantic-ui-react'
import { useLocation, useHistory } from 'react-router-dom';
import APIURL from '../helpers/environment';


const Flashcard = (props) => {
    const [questions, setQuestions] = useState([]);
    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        console.log('FROM FLASHCARD', location.topic.id)
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

    return (
        <div>
            <Button basic className='backButton' color='yellow' onClick={goBack}>Go Back </Button>
        <div style={{ textAlign: 'center' }}>
            <h1>{location.topic.name}</h1>
            <h3>Hover to see the answer</h3>
            <Grid centered columns={2}>
                {questions.map((question) =>
                    <Grid.Row>
                        <Grid.Column>
                            <div>
                                <Reveal animated='move right'>
                                    <Reveal.Content visible>
                                        <div className='flashcard'>
                                            <h3>{question.question}</h3>
                                        </div>
                                    </Reveal.Content>
                                    <Reveal.Content hidden>
                                        <div className='flashcard'>
                                            <h3>Answer</h3>
                                        </div>
                                    </Reveal.Content>
                                </Reveal>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                )}
            </Grid>
        </div>
        </div>
    );
}

export default Flashcard;