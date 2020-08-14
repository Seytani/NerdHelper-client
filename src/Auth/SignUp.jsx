import React from 'react';
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';

const SignUp = (props) => {


    return (
        <Form>
            <FormGroup>
                <Label for="examplePassword">Name</Label>
                <Input type="name" name="name" id="name" placeholder="Enter your real name or super hero name" />
            </FormGroup>
            <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input type="email" name="email" id="email" placeholder="Enter you email address" />
            </FormGroup>
            <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input type="password" name="password" id="password" placeholder="Enter Password" />
            </FormGroup>
            <Button>Sign Up</Button>
        </Form>
    );
}

export default SignUp;

