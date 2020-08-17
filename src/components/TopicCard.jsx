import React from 'react';
import { Card } from 'semantic-ui-react'
import TopicUpdate from './TopicUpdate';
import TopicDelete from './TopicDelete';

const TopicCard = (props) => {

    return (
        <div>
            <Card style={{margin: '2em'}}>
                <Card.Content style={{ textAlign: "center" }}>
                    <h3>{props.topic.name}</h3>
                </Card.Content>
                <Card.Content extra>
                    <TopicUpdate topic={props.topic} fetchTopics={props.fetchTopics} />
                    <TopicDelete topic={props.topic} fetchTopics={props.fetchTopics} />
                </Card.Content>
            </Card>
        </div>
    );
}

export default TopicCard;