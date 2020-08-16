import React, { useState, Fragment } from 'react';
import {
    Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem,
    NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavbarText, Button
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlasses } from '@fortawesome/free-solid-svg-icons';

const TopBar = (props) => {
    const glassesIcon = <FontAwesomeIcon icon={faGlasses} />
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    function activeSession(active) {
        if (active) {
            return (
                <Fragment>
                    <NavItem>
                        <NavLink href="/components/">Topics</NavLink>
                    </NavItem>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                            Views
                </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem>
                                Caroussel Study
                </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem>
                                Flash Cards
                </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem>
                                Quiz
                </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                    {/* <NavbarText>Welcome "User"</NavbarText>
                    <Button className="ml-3">Logout</Button> */}
                    <Button className="ml-3" id="Logout" onClick={props.logout}>Logout</Button>
                </Fragment>
            );
        } else {
            return (
                <Fragment>
                    <Button className="btn d-flex justify-content-between" id="signupLogin">Sign Up / Login</Button>
                </Fragment>);
        }
    }


    return (
        <div>
            <Navbar color="dark" light expand="md">
                <NavbarBrand className="nav-brand" href="/">{glassesIcon}</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        {activeSession(props.isLoggedIn)}
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default TopBar;