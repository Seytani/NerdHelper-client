import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';

const Login = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    let handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:3001/user/login', {
            method: 'POST',
            body: JSON.stringify({ email: email, password: password }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
            .then(res => res.json()).then(data => { localStorage.setItem('token', data.sessionToken); props.toHome()})
            
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


// import React, { Component } from 'react';
// import { Form, Button } from 'semantic-ui-react';

// class Login extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             email: '',
//             password: ''
//         }
//         this.handleSubmit = this.handleSubmit.bind(this);
//         this.handleChange = this.handleChange.bind(this);
//     }

// componentWillUpdate() {
//     console.log('UPDATING');
//     console.log('email', this.state.email);
//     console.log('password', this.state.password);
// }
//     handleSubmit(e) {
//         e.preventDefault();
//         fetch('http://localhost:3001/user/login', {
//             method: 'POST',
//             body: JSON.stringify({ email: this.state.email, password: this.state.password }),
//             headers: new Headers({
//                 'Content-Type': 'application/json'
//             })
//         })
//             .then(res => res.json()).then(data => {localStorage.setItem('token', data.sessionToken)})
//             // this.props.history.replace({pathname: '/topics'})
//     }

//     handleChange(e) {
//         let email = e.target.value;
//         this.setState({email})
//     }

//     render() {
//         return (
//             <div style={{ padding: '2em' }}>
//                 <h1>Login</h1> <br />
//                 <Form onSubmit={this.handleSubmit}>
//                     <Form.Field required>
//                         <label for="email">Email</label>
//                         <Form.Input type="email" name="email" id="email" placeholder="Enter you email address"
//                             width={6}
//                             onChange={this.handleChange} />
//                     </Form.Field>
//                     <Form.Field>
//                         <label for="password">Password</label>
//                         <Form.Input type="password" name="password" id="password" placeholder="Enter Password"
//                             minLength="6"
//                             width={6}
//                             onChange={e => {let pass =  e.target.value; this.setState( { password: pass } )}} />
//                     </Form.Field>
//                     <Button type='submit'>Login</Button>
//                 </Form>

//             </div>
//         );
//     }
// }

// export default Login;
