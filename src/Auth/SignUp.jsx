import React, { useState } from 'react';
import { Form } from 'semantic-ui-react';
import APIURL from '../helpers/environment';

const SignUp = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`${APIURL}/user/add-user`, {
            method: 'POST',
            body: JSON.stringify({ name: name, email: email, password: password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        })
            .then(res => res.json()).then(data => { localStorage.setItem('token', data.sessionToken); props.toHome() })
    }

    return (
        <div className='authForms'>
            <h1 className='authHeader'> Sign Up</h1>
            <Form size={'big'} onSubmit={handleSubmit}>
                <Form.Field required>
                    <label for="name">Name</label>
                    <Form.Input required type="text" name="name" id="name" placeholder="Enter name"
                        onChange={e => setName(e.target.value)} />
                </Form.Field>
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
                <button type='submit' className='authButton'>Sign Up</button>
            </Form>
            <div className='authToggle'>
                <p className='authToggleText'>Already have an account?</p>
                <button className='authToggleButton' onClick={props.toggleAuth}>Log In</button>
            </div>
        </div>
    );
}

export default SignUp;

