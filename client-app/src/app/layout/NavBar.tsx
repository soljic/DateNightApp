import { useState, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import { Button, Dropdown, Image } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import LoginForm from "../../features/users/LoginForm";
import RegisterForm from "../../features/users/RegisterForm";
import "./NavBar.css";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const {
    userStore: { user, isLoggedIn, logout },
    modalStore,
  } = useStore();
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const navRef = useRef<HTMLElement | null>(null);

  const showNavbar = () => {
    setMenuIsOpen(!menuIsOpen);
    navRef.current?.classList.toggle("responsive_nav");
  };

  function handleMenuClick() {
    setMenuIsOpen(!menuIsOpen);
  }

  return (
    <>
      <header>
        <div className="navbarLogo">
          <NavLink to="/">
            <Image src="/assets/logo.png" alt="logo" />
          </NavLink>
        </div>
        <nav className="navbar" ref={navRef}>
          {isLoggedIn ? (
            <>
              <div
                className={`navbarLinks ${
                  menuIsOpen ? "navbarLinksMobile" : ""
                }`}
              >
                <NavLink to="/activities" className="navbarLink">
                  Activities
                </NavLink>
                <NavLink to="/quizzes" className="navbarLink">
                  Quizz
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
              <div
                className={`navbarLinks ${
                  menuIsOpen ? "navbarLinksMobile" : ""
                }`}
              >
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
              <button className="nav-btn nav-close-btn" onClick={showNavbar}>
                <FaTimes />
              </button>
            </>
          )}
        </nav>
        <button className="nav-btn" onClick={showNavbar}>
        {menuIsOpen ?  <FaBars/> : <FaTimes/> }
      </button>
      </header>
    </>
  );
}
