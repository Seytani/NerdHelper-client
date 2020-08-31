import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import TopBar from '../site/TopBar';
import TopicCard from '../Topics/TopicCard';
import TopicCreate from '../Topics/TopicCreate';
import ManageQuestions from '../Questions/ManageQuestions';
import Flashcard from '../Views/Flashcard';
import APIURL from '../helpers/environment';
import Study from '../Views/Study';

export default class Topics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topics: [],
        }
        this.fetchTopics = this.fetchTopics.bind(this);
        this.toHome = this.toHome.bind(this);
        this.toQuestion = this.toQuestion.bind(this);
        this.toFlashcards = this.toFlashcards.bind(this);
        this.toStudy = this.toStudy.bind(this);
        this.pullColumn = this.pullColumn.bind(this);
    }

    componentWillMount() {
        this.fetchTopics();
    }

    fetchTopics() {
        fetch(`${APIURL}/topics/view-all`, {
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

    toHome() {
        this.props.history.replace({pathname: '/', state: null})
    }
    
    toFlashcards(id) {
        let currentTopic = this.state.topics[this.state.topics.findIndex(element => element.id === id)];
        this.props.history.push({
            pathname: `${this.props.match.path}/${id}/flashcards`,
            topic: currentTopic
        });
    }

    toStudy(id) {
        let currentTopic = this.state.topics[this.state.topics.findIndex(element => element.id === id)];
        this.props.history.push({
            pathname: `${this.props.match.path}/${id}/study`,
            topic: currentTopic
        });
    }

    pullColumn(topic) {
        return (
            <Grid.Column>
                <TopicCard topic={topic} fetchTopics={this.fetchTopics} toQuestion={this.toQuestion} toFlashcards={this.toFlashcards} toStudy={this.toStudy}/>
            </Grid.Column>
        )
    }

    render() { 
        return (
            <div>
                    <TopBar toHome={this.toHome}/>
                <Switch>
                    <Route exact path={this.props.match.path}>
                        <div id='topicsCreate'>
                            <h1 className='header'>Study Topics</h1>
                            <TopicCreate token={this.props.token} fetchTopics={this.fetchTopics} />
                        </div>
                        <Grid columns={4} style={{marginRight: '3em'}}>
                            <Grid.Row>  {this.state.topics.map(topic => this.pullColumn(topic))}</Grid.Row>
                        </Grid>
                    </Route>
                    <Route path={`${this.props.match.path}/:topicId/questions`} component={ManageQuestions} />
                    <Route path={`${this.props.match.path}/:topicId/flashcards`} component={Flashcard} />
                    <Route path={`${this.props.match.path}/:topicId/study`} component={Study} />
                </Switch>
            </div>
        )
    }
}


