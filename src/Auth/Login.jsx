import React from 'react';
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';

const Login = () => {


    return (
        <Form>
            <FormGroup>
                <Label for="email">Email</Label>
                <Input type="email" name="email" id="email" placeholder="Enter you email address" />
            </FormGroup>
            <FormGroup>
                <Label for="password">Password</Label>
                <Input type="password" name="password" id="password" placeholder="Enter Password" />
            </FormGroup>
            <Button>Login</Button>
        </Form>
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