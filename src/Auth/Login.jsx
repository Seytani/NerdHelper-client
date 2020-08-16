import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:3001/user/login', {
            method: 'POST',
            body: JSON.stringify({ email: email, password: password }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        .then(res => res.json()).then(data => props.updateToken(data.sessionToken))
    }

    return (
        <div>
            <h1>Login</h1> <br/>
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label for="email">Email</Label>
                <Input type="email" name="email" id="email" placeholder="Enter you email address" 
                onChange={e => setEmail(e.target.value)} />
            </FormGroup>
            <FormGroup>
                <Label for="password">Password</Label>
                <Input type="password" name="password" id="password" placeholder="Enter Password" 
                onChange={e => setPassword(e.target.value)}/>
            </FormGroup>
            <Button type='submit'>Login</Button>
        </Form>
        
        </div>
    );
}

export default Login;

//set your states with the varuables you need - which ones are you sending to backend?
/*
*Add a submit function to the Form tag. handle the function. It takes an event as a parameter and fetches
your API! Remember that the submit button refreshes the page by default.
* The fetch has the url, method: CRUD? body:handle Json, how? (takes the things that will get sent!),
headers: new header object, ewhat TYPE OF CONTENT is going to be set/receiving?, jasonify results,
take the token, what function do you need to handle the token?
* Forms - complete associations, how are you linking user input to your states? which functions handle event
on change? <- ;), HINT: takes an event, you want to set you states.
*Specify the type of button at the end!
*/