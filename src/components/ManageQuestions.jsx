import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

class ManageQuestions extends Component {
    constructor(props) {
        console.log(props);
        super(props);
        this.state = {
            questions: [],
    }
    this.fetchQuestions=this.fetchQuestions.bind(this);
}
fetchQuestions() {
    console.log(this.props.location)
    fetch(`http://localhost:3001/topics/view-topic/${this.props.location.topic.id}`, {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        })
    })
    .then(res => res.json()).then(data => { this.setState({questions: data.questions}); console.log('FROM FETCH', data.questions) })
}



componentWillMount() {
    console.log('test');
    this.fetchQuestions();
    console.log('manage questions---', this.state.questions);
}

    render() {
        return (
            <div>
            <Button basic color='yellow' onClick={this.fetchQuestions}>Manage Questions </Button>
        </div>
        )
    }
}
    
export default ManageQuestions;
