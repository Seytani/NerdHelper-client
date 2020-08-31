import React from 'react'
import { Menu, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

let TopBar = (props) => {

    let logout = () => {
        localStorage.clear()
        props.toHome();
    }

    return (
        <Menu inverted size='massive' style={{marginBottom: '0px'}}>
            <Menu.Item style={{ fontSize: "1.5em" }}>
                <div id='topBarBrand'>.</div>
            </Menu.Item>
            <Menu.Item>
                <Link to='/topics'>Topics</Link>
            </Menu.Item>
            <Menu.Item position='right'>
                <Button inverted color='brown' onClick={logout}>Logout</Button>
            </Menu.Item>
        </Menu>
    )
}

export default TopBar;