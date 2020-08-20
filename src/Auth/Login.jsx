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
