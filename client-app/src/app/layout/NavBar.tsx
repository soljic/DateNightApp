import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Button, Dropdown, Image } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import LoginForm from "../../features/users/LoginForm";
import RegisterForm from "../../features/users/RegisterForm";
import "./NavBar.css";

export default function Navbar() {
  const {
    userStore: { user, isLoggedIn, logout }, modalStore
  } = useStore();
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  function handleMenuClick() {
    setMenuIsOpen(!menuIsOpen);
  }

  return (
    <nav className="navbar">
      <div className="navbarLogo">
        <NavLink to="/">
          <Image src="/assets/logo.png" alt="logo" />
        </NavLink>
      </div>
        {isLoggedIn ? (
          <>
          <div className={`navbarLinks ${menuIsOpen ? "navbarLinksMobile" : ""}`}>
            <NavLink to="/activities" className="navbarLink">
              Activities
            </NavLink>
            <NavLink to="/createActivity">
              <Button
                className="navbarButton"
                content="Create Activity"
                positive
              />
            </NavLink>
            </div>
            <Dropdown
              className="navbarDropdown"
              trigger={
                <span>
                  <Image
                    src={user?.image || "/assets/user.png"}
                    avatar
                    spaced="right"
                  />
                  {user?.displayName}
                </span>
              }
            >
              <Dropdown.Menu>
                <Dropdown.Item
                  as={Link}
                  to={`/profiles/${user?.username}`}
                  text="My Profile"
                  icon="user"
                />
                <Dropdown.Item onClick={logout} text="Logout" icon="power" />
              </Dropdown.Menu>
            </Dropdown>

          </>
        ) : (
          <>
            <div className={`navbarLinks ${menuIsOpen ? "navbarLinksMobile" : ""}`}>
            <NavLink to="/aboutUs" className="navbarLink">
              About Us
            </NavLink>
            <NavLink to="/services" className="navbarLink">
              Services
            </NavLink>
            <NavLink to="/gallery" className="navbarLink">
              Gallery
            </NavLink>
            <div className="navbarButtonGroup">
              <Button
                onClick={() => modalStore.openModal(<LoginForm />)}
                size="huge"
                inverted
              >
                Login!
              </Button>
              <Button
                onClick={() => modalStore.openModal(<RegisterForm />)}
                size="huge"
                inverted
              >
                Register!
              </Button>
            </div>
          </div>
          </>
        )}
      <div className="navbarMenuIcon" onClick={handleMenuClick}>
        <i className={`fa ${menuIsOpen ? "fa-times" : "fa-bars"}`}></i>
      </div>
    </nav>
  );
}