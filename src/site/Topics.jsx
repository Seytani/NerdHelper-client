import React, { useState, useEffect } from 'react';
import { Grid } from 'semantic-ui-react'
import TopicCard from '../components/TopicCard';
import TopicCreate from '../components/TopicCreate';

const Topics = (props) => {
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        fetchTopics();
    }, []);

    let fetchTopics = () => {
        fetch('http://localhost:3001/topics/view-all', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        })
            .then(res => res.json()).then(data => { setTopics(data); console.log(data) })
    };


    let pullColumn = (topic) => {
        return (
            <Grid.Column>
                <TopicCard topic={topic} fetchTopics={fetchTopics} />
            </Grid.Column>
        )
    };

    return (
        <div>
        <div style={{textAlign: 'center'}}>
            <h1>Study Topics</h1>
            <TopicCreate token={props.token} fetchTopics={fetchTopics} />
        </div>
            <Grid columns={4}>
                <Grid.Row>  {topics.map(topic => pullColumn(topic))}</Grid.Row>
            </Grid>
        </div>
    );
}

export default Topics;