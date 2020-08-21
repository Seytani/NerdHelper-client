import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';

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
            .then(res => res.json()).then(data => localStorage.setItem('token', data.sessionToken))
    }

    return (
        <div style={{ padding: '2em' }}>
            <h1>Login</h1> <br />
            <Form onSubmit={handleSubmit}>
                <Form.Field required>
                    <label for="email">Email</label>
                    <Form.Input type="email" name="email" id="email" placeholder="Enter you email address"
                        width={6}
                        onChange={e => setEmail(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label for="password">Password</label>
                    <Form.Input type="password" name="password" id="password" placeholder="Enter Password"
                        minLength="6"
                        width={6}
                        onChange={e => setPassword(e.target.value)} />
                </Form.Field>
                <Button type='submit'>Login</Button>
            </Form>

        </div>
    );
}

export default Login;
