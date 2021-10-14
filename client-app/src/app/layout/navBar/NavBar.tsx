import React from 'react';
import './NavBar.css';
import { Button, Container, Menu } from 'semantic-ui-react'

function NavBar() {
    return (
        <div>
            <Menu 
            inverted
            fixed="top">
                <Container>
                    <Menu.Item header>
                        <img className="imageNavbar" src="/assets/logoTrivium.png" alt="logo" />
                        Trivium kviz
                    </Menu.Item>
                    <Menu.Item name="Activities"/>
                    <Menu.Item >
                      <Button positive content ="Aply for a quiz" />
                    </Menu.Item>
                </Container>

            </Menu>
        </div>
    )
}

export default NavBar
