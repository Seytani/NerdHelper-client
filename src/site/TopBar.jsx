import React, { useState, Fragment } from 'react'
import { Menu, Button, Dropdown } from 'semantic-ui-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlasses } from '@fortawesome/free-solid-svg-icons';

let TopBar = (props) => {
    const glassesIcon = <FontAwesomeIcon icon={faGlasses} />
    const [activeItem, setActiveItem] = useState('');

    let handleItemClick = (e, { name }) => setActiveItem(name);
    let activeSession = (active) => {
        if (active) {
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
                Topics
        </Menu.Item>

            <Dropdown item text='Change Study Mode'>
                <Dropdown.Menu>
                    <Dropdown.Item>List Mode</Dropdown.Item>
                    <Dropdown.Item>Flash Card Mode</Dropdown.Item>
                    <Dropdown.Item>Quiz</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            {activeSession(props.isLoggedIn)}
        </Menu>
    )
}

export default TopBar;