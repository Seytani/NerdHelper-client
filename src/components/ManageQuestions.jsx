import React, { Component } from 'react';
import { Button, Card } from 'semantic-ui-react';
import QuestionCard from './QuestionCard';
import QuestionCreate from './QuestionCreate';
import APIURL from '../helpers/environment';


class ManageQuestions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
        }
        this.fetchQuestions = this.fetchQuestions.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    componentWillMount() {
        console.log(this.props.location)
        this.fetchQuestions();
        console.log('manage questions---', this.state.questions);
    }

    fetchQuestions() {
        fetch(`${APIURL}/topics/view-topic/${this.props.location.topic.id}`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            })
        })
            .then(res => res.json()).then(data => { this.setState({ questions: data.questions }) })
        }

    goBack() {
        this.props.history.goBack();
    }


    render() {
        return (
            <div>
                <Button basic color='yellow' onClick={this.goBack}>Go Back </Button>
                {/* <Button basic color='yellow' onClick={this.fetchQuestions}>Fetch Questions </Button> */}
                <QuestionCreate topic={this.props.location.topic} fetchQuestions={this.fetchQuestions}/>
            {this.state.questions[0] != undefined ? 
                this.state.questions.map(question => <QuestionCard question={question} topic={this.props.location.topic} fetchQuestions={this.fetchQuestions}/>)
                : <h3>Questions added will display here</h3>}
                
            </div>
        )
    }
}

export default ManageQuestions;
