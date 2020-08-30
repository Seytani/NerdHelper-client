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
        <div className='topicCard' >
                <h3 className='topicCardHeader'>{props.topic.name}</h3>
                <div className='topicCardHeaderButtons'>
                    <TopicUpdate topic={props.topic} fetchTopics={props.fetchTopics} />
                    <TopicDelete topic={props.topic} fetchTopics={props.fetchTopics} />
                </div>
                <hr className='divider'/>
                <div className='topicCardQuestionButtons'>
                    {/* <Link to='/questions'><Button>This</Button></Link> */}
                    <button className='topicCardButton one' onClick={manageQuestionsClick}>Manage Questions</button>
                    <button className='topicCardButton two'onClick={flashcardsClick}>Flashcards</button>
                    <button className='topicCardButton three'onClick={flashcardsClick}>Flashcards</button>
                </div>
               
        </div>
    );
}

export default TopicCard;