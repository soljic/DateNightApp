import React from "react";
import "./NavBar.css";
import { Button, Container, Menu } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";

function NavBar() {


  return (
    <div>
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item as={NavLink} to="/" exact header>
            <img
              className="imageNavbar"
              src="/assets/logoTrivium.png"
              alt="logo"
            />
            Trivium kviz
          </Menu.Item>
          <Menu.Item as={NavLink} to="/activities" name="Activities" />
          <Menu.Item as={NavLink} to="/errors" name="Errors" />
          <Menu.Item>
            <Button
              as={NavLink}
              to="/createActivity"
              positive
              content="Aply for a quiz"
            />
          </Menu.Item>
        </Container>
      </Menu>
    </div>
  );
}

export default observer(NavBar);
