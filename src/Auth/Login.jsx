import React, { useState } from 'react';
import { Form } from 'semantic-ui-react';
import APIURL from '../helpers/environment';

const Login = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let handleSubmit = (e) => {
        e.preventDefault();
        fetch(`${APIURL}/user/login`, {
            method: 'POST',
            body: JSON.stringify({ email: email, password: password }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
            .then(res => res.json()).then(data => { localStorage.setItem('token', data.sessionToken); props.toHome() })

    }

    return (
        <div className='authForms'>
            <h1 className='authHeader'>Login</h1>
            <Form size={'big'} onSubmit={handleSubmit}>
                <Form.Field required>
                    <label for="email">Email</label>
                    <Form.Input required type="email" name="email" id="email" placeholder="Enter you email address"
                        onChange={e => setEmail(e.target.value)} />
                </Form.Field>
                <Form.Field required>
                    <label for="password">Password</label>
                    <Form.Input required type="password" name="password" id="password" placeholder="Enter Password"
                        minLength="6" onChange={e => setPassword(e.target.value)} />
                </Form.Field>
                <button type='submit' className='authButton'>Login</button>
            </Form>
            <div className='authToggle'>
                <p className='authToggleText'>New user?</p>
                <button onClick={props.toggleAuth} className='authToggleButton'>Create an account</button>
            </div>
        </div>
    );
}

export default Login;
