import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import APIURL from '../helpers/environment';
import { Grid, Button, Form, Radio, List } from 'semantic-ui-react';

const Quiz = (props) => {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
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
        .then(res => res.json()).then(data => { setupQuestionAndAnswers(data.questions)});
    }

    const setupQuestionAndAnswers = questions => {
        setQuestions(scramble(questions));
        setAnswers(questions.map(q => ('')));
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
    };

    let scramble = arr => {
        let indexes = generateIndexes(arr.length)
        let temp = [];
        for (let index of indexes) {
            temp.push(arr[index]);
        }
        return temp;
    };

    let handleChangeAnswer = (e, { value, index }) => {
        const copyAnswers = answers.slice();
        copyAnswers[index] = value;
        console.log('change!!!!', copyAnswers);
        setAnswers(copyAnswers);
    };

    let generateQuestionsDom = () =>{
        if (!questions.length) {
            return;
        }
        const questionDom = [];
        for (const [index, question] of questions.entries()) {
            questionDom.push(
                <div key={question.id}>
                    <p className='quizQuestion'>
                        { ` ${index +1}. ${question.question}` }
                    </p>
                    <div className='quizAnswers'>
                        { generateAnswersDom(index, question) }
                    </div>
                </div>
            )
        }
        return questionDom;
    }
    let generateAnswersDom = (index, question) => {
        let questionAnswers = [question.incorrectAnswer_1, question.incorrectAnswer_2, question.incorrectAnswer_3, question.correctAnswer]
        questionAnswers = (scramble(questionAnswers));
        const answersDom = []
        for (const answer of questionAnswers) {
            answersDom.push(
                <Radio 
                    required                
                    className='quizRadio'
                    key={answer}
                    label={answer}
                    name={question.question}
                    value={answer}
                    index={index} 
                    checked={answers[index] === answer}
                    onChange={ handleChangeAnswer }
                />
            )
        }
        return answersDom;
    }

    

    const handleSubmitClick = () => {
        const isQuizAnswered = answers.reduce((acc, next) => ( next.length > 0));
        if (!isQuizAnswered) {
            alert('Please answer all questions.');
            return;
        }
        fetch(`${APIURL}/quiz`, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }),
            body: JSON.stringify({ questions, answers}),
        })
        .then(resp => console.log(resp));
    };

    return(
        <Grid centered>
            <div id='quiz'>
                <Button basic className='studyBackButton' style={{ marginTop: '3em', display: 'block' }} color='yellow' onClick={goBack} >Go Back </Button>
                    <h1 className='header'>{`Quiz: ${location.topic.name}`}</h1>
                <Form>
                    <ul id='quizList'>
                        <li>
                            <div className="quizElement">
                                { generateQuestionsDom() }
                            </div>
                        </li>
                    </ul>
                    <button className='button flash' onClick={ handleSubmitClick } type="submit">Submit</button>
                </Form>
            </div>
        </Grid>
    );
}

export default Quiz;
