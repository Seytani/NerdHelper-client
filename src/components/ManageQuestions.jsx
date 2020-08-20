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
    componentWillMount() {
        console.log('manage questions---', this.props.location);
    }
    fetchQuestions() {
        fetch(`http://localhost:3001/topics/view-topic/1`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            })
        })
            .then(res => res.json()).then(data => { this.setState({questions: data}); console.log(data) })
    };


    render() {
        return (
            <div>
            <h1>{}</h1>
            <Button basic color='yellow' onClick={this.fetchQuestions}>Manage Questions </Button>
        </div>
        )
    }
}
    
export default ManageQuestions;
