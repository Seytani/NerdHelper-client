import React, { useState } from 'react';
import { Form } from 'semantic-ui-react';

const SignUp = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:3001/user/add-user', {
        method: 'POST', 
        body: JSON.stringify({name: name, email: email, password: password}),
        headers: new Headers({ 'Content-Type': 'application/json'}),
    })
    .then(res => res.json()).then(data => props.updateToken(data.sessionToken))
    }

    return (
        <div style={{padding: '2em'}}>
        <h1> Sign Up</h1> <br/>
        <Form onSubmit={handleSubmit}>
            <Form.Field required>
                <label for="name">Name</label>
                <Form.Input type="text" name="name" id="name" placeholder="Enter name" 
                width={6} onChange={e => setName(e.target.value)} required/>
            </Form.Field>
            <Form.Field required>
                <label for="email">Email</label>
                <Form.Input type="email" name="email" id="email" placeholder="Enter you email address" 
                width={6} onChange={e => setEmail(e.target.value)}/>
            </Form.Field>
            <Form.Field required>
                <label for="password">Password</label>
                <Form.Input type="password" name="password" id="password" placeholder="Enter Password" 
                width={6} minLength="6" onChange={e => setPassword(e.target.value)}/>
            </Form.Field>
            <Form.Button type='submit'>Sign Up</Form.Button>
        </Form>
        </div>
    );
}

export default SignUp;

