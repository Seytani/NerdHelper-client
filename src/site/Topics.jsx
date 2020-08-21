import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import TopicCard from '../components/TopicCard';
import TopicCreate from '../components/TopicCreate';
import ManageQuestions from '../components/ManageQuestions';

export default class Topics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topics: [],
        }
        this.fetchTopics = this.fetchTopics.bind(this);
        this.toQuestion = this.toQuestion.bind(this);
        this.pullColumn = this.pullColumn.bind(this);
    }

    componentWillMount() {
        this.fetchTopics();
    }

    fetchTopics() {
        fetch('http://localhost:3001/topics/view-all', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            })
        })
            .then(res => res.json()).then(data => this.setState({ topics: data }))
    }

    toQuestion(id) {
        let currentTopic = this.state.topics[this.state.topics.findIndex(element => element.id === id)];
        this.props.history.push({
            pathname: `${this.props.match.path}/${id}/questions`,
            topic: currentTopic
        });
    }

    pullColumn(topic) {
        return (
            <Grid.Column>
                <TopicCard topic={topic} fetchTopics={this.fetchTopics} toQuestion={this.toQuestion} />
            </Grid.Column>
        )
    }

    render() { 
        return (
            <div>
                <Switch>
                    <Route exact path={this.props.match.path}>
                        <div style={{ textAlign: 'center' }}>
                            <h1>Study Topics</h1>
                            <TopicCreate token={this.props.token} fetchTopics={this.fetchTopics} />
                        </div>
                        <Grid columns={4}>
                            <Grid.Row>  {this.state.topics.map(topic => this.pullColumn(topic))}</Grid.Row>
                        </Grid>
                    </Route>
                    <Route path={`${this.props.match.path}/:topicId/questions`} component={ManageQuestions} />
                </Switch>
            </div>
        )
    }
}


