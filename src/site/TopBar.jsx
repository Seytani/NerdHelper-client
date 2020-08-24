import React, { useState, useEffect } from 'react'
import { Menu, Button, Dropdown } from 'semantic-ui-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlasses } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

let TopBar = (props) => {
    const glassesIcon = <FontAwesomeIcon icon={faGlasses} />
    const [activeItem, setActiveItem] = useState('');

    let handleItemClick = ({ name }) => setActiveItem(name);


    let activeSession = () => {
        if (props.isLoggedIn) {
            return (
                <Menu.Menu position='right'>
                    <Menu.Item>
                        <Button inverted color='brown' onClick={props.logout}>Logout</Button>
                    </Menu.Item>
                </Menu.Menu>
            )
        }
    }
    return (
        <Menu inverted size='massive'>
            <Menu.Item style={{ fontSize: "1.5em" }}>
                {glassesIcon}
            </Menu.Item>

            <Menu.Item
                name='topics'
                active={activeItem === 'topics'}
                onClick={handleItemClick}
            >
                <Link to='/topics'>Topics</Link>
        </Menu.Item>
        

            <Dropdown item text='Change Study Mode'>
                <Dropdown.Menu>
                    <Dropdown.Item>List Mode</Dropdown.Item>
                    <Dropdown.Item>Flash Card Mode</Dropdown.Item>
                    <Dropdown.Item>Quiz</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            {activeSession()}
        </Menu>
    )
}

export default TopBar;