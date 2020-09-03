import React, { useState, useEffect, Fragment } from 'react';
import APIURL from '../helpers/environment'
import { useLocation, useHistory } from 'react-router-dom';
import { Grid, Menu, Button, Checkbox } from 'semantic-ui-react';

const Study = (props) => {
    const [questions, setQuestions] = useState([]);
    const [showReview, setShowReview] = useState(false);
    const [activeItem, setActiveItem] = useState('all');
    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        console.log('FROM STUDY', location.topic.id)
        fetchQuestions();
    }, [])

    let handleItemClick = (e, { name }) => { setActiveItem(name); name === 'review' ? setShowReview(true) : setShowReview(false)};

    const goBack = () => {
        history.goBack();
    }
    
    const fetchQuestions = () => {
        fetch(`${APIURL}/topics/view-topic/${location.topic.id}`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            })
        })
            .then(res => res.json()).then(data => { setQuestions(data.questions) })
    }

    const toggleInReview = (question) => {
        question.review = !question.review;
        fetch(`${APIURL}/question/edit/${question.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                review: (question.review)
            }),
            headers: new Headers({  
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            })
        })
            .then(res => res.json()).then(data => { console.log('executed'); })
    }

    const generateQuestions = () => {
        if (showReview) {
            return (
                questions.filter(q => q.review).map(question => 
                    <div className='studyQuestionDiv' key={question.id}>
                        <h3 className='studyQuestion'>{`Q: ${question.question}`}</h3>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h4 className='studyAnswer'>{`A:   ${question.correctAnswer}`}</h4>
                            <div>
                                <p>In review:</p>
                                <Checkbox slider defaultChecked onClick={() => { toggleInReview(question) }} />
                            </div>
                        </div>
                    </div>)
                    )
        } else {
            return (
                questions.map((question) =>
                    <div className='studyQuestionDiv' key={question.id}>
                        <h3 className='studyQuestion'>{`Q: ${question.question}`}</h3>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h4 className='studyAnswer'>{`A:   ${question.correctAnswer}`}</h4>
                            <div>
                                <p>In review:</p>
                                <Checkbox slider defaultChecked={question.review} onClick={() => { toggleInReview(question) }} />
                            </div>
                        </div>
                    </div>
                )
            )
        }
    }



    return (
            <Grid centered>
        <div id='study'>
            <Button basic className='studyBackButton' style={{marginTop: '3em', display:'block'}} color='yellow' onClick={goBack} >Go Back </Button>
            {questions[0] !== undefined ? 
                <div style={{ display: "flex", flexDirection: 'column' }}>
                    <h1 className='header' style={{ marginBottom: '1em' }}>{`Topic: ${location.topic.name}`}</h1>
                    <Menu color='yellow' widths={2}>
                        <Menu.Item
                            name='all'
                            active={activeItem === 'all'}
                            onClick={handleItemClick}
                        />
                        <Menu.Item
                            name='review'
                            active={activeItem === 'review'}
                            onClick={handleItemClick}
                        />
                    </Menu>
                    <div className='studyQuestions'>
                        {generateQuestions()}
                    </div>

                </div>
                : <div className='header' ><h1>Topic: {location.topic.name}</h1><h1>Please go back and add some questions!</h1></div>}
        </div>
        </Grid>
    );
}

export default Study;
