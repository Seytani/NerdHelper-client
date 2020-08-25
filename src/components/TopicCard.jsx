import React from 'react';
import { Card, Button } from 'semantic-ui-react'
import TopicUpdate from './TopicUpdate';
import TopicDelete from './TopicDelete';

const TopicCard = (props) => {

    let manageQuestionsClick = () => {
        props.toQuestion(props.topic.id);
    }

    let flashcardsClick = () => {
        props.toFlashcards(props.topic.id);

    }
    return (

        < div >
        <Card style={{ margin: '2em',  height: '10em'}}>
            <Card.Content style={{ textAlign: "center" }}>
                <h3>{props.topic.name}</h3>
            </Card.Content>
            <Card.Content extra>
                <div className='ui two buttons'>
                    {/* <Link to='/questions'><Button>This</Button></Link> */}
                    <Button onClick={manageQuestionsClick}>Manage Questions</Button>
                    <Button onClick={flashcardsClick}>Flashcards</Button>
                    <TopicUpdate topic={props.topic} fetchTopics={props.fetchTopics} />
                    <TopicDelete topic={props.topic} fetchTopics={props.fetchTopics} />
                </div>
            </Card.Content>
        </Card>
        </div >
    );
}

export default TopicCard;