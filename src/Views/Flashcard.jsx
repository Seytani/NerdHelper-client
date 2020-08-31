import React, { useState, useEffect } from 'react';
import { Reveal, Button, Grid, Checkbox } from 'semantic-ui-react'
import { useLocation, useHistory } from 'react-router-dom';
import APIURL from '../helpers/environment';

const Flashcard = (props) => {
    const [questions, setQuestions] = useState([]);
    const [review, setReview] = useState(false);
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

    const toggleInReview = (question) => {
        fetch(`${APIURL}/question/edit/${question.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                review: review
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            })
        })
            .then(res => res.json()).then(data => {  })
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
                <div className='flashcardComponent'>
                    <Grid centered>
                            <div>
                            <Button basic className='compBackButton' color='yellow' onClick={goBack}>Go Back </Button>
                            </div>
                            {questions[0] !== undefined ?
                            <div className='flashcardHeaders'>
                                <h1>Topic: {location.topic.name}</h1>
                                <h3>Hover to see the answer</h3>
                                {questions.map((question) =>
                                    <Grid.Row>
                                        <Grid.Column>
                                            <div>
                                                <Reveal animated='move right'>
                                                    <Reveal.Content visible>
                                                        <div className='flashcardVisible'>
                                                            <h3 className='flashcardText'>{question.question}</h3>
                                                        </div>
                                                    </Reveal.Content>
                                                    <Reveal.Content hidden>
                                                        <div className='flashcardHidden'>
                                                            <h3 className='flashcardText'>{question.correctAnswer}</h3>
                                                            <div>
                                                                <p>In review:</p>
                                                                <Checkbox slider defaultChecked={question.review} onClick={() => {setReview(!question.review); toggleInReview(question)}}/>
                                                            </div>
                                                        </div>
                                                    </Reveal.Content>
                                                </Reveal>
                                            </div>
                                        </Grid.Column>
                                    </Grid.Row>
                                )}
                            </div>
    : <div className='noFlashcards flashcardHeaders' ><h1>Topic: {location.topic.name}</h1><h1>Please go back and add some questions!</h1></div>}
    </Grid>
        </div>
    );
}

export default Flashcard;