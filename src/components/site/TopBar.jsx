import React, { useState } from 'react';
import {
    Collapse,Navbar,NavbarToggler,NavbarBrand,Nav,NavItem,
    NavLink,UncontrolledDropdown,DropdownToggle,DropdownMenu,DropdownItem,NavbarText, Button
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlasses } from '@fortawesome/free-solid-svg-icons';

const TopBar = (props) => {
    const glassesIcon = <FontAwesomeIcon icon={faGlasses} />
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar color="dark" light expand="md">
                <NavbarBrand className="nav-brand" href="/">{glassesIcon}</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
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
                    </Nav>
                    <Button className="ml-3" id="signupLogin">Sign Up / Login</Button>
                    {/* <NavbarText>Welcome "User"</NavbarText>
                    <Button className="ml-3">Logout</Button> */}
                </Collapse>
            </Navbar>
        </div>
    );
}

export default TopBar;