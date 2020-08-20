import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';

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
        <div>
        <h1> Sign Up</h1> <br/>
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label for="examplePassword">Name</Label>
                <Input type="name" name="name" id="name" placeholder="Enter your real name or super hero name" 
                onChange={e => setName(e.target.value)}/>
            </FormGroup>
            <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input type="email" name="email" id="email" placeholder="Enter you email address" 
                onChange={e => setEmail(e.target.value)}/>
            </FormGroup>
            <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input type="password" name="password" id="password" placeholder="Enter Password" 
                onChange={e => setPassword(e.target.value)}/>
            </FormGroup>
            <Button type='submit'>Sign Up</Button>
        </Form>
        </div>
    );
}

export default SignUp;

