import React, { useEffect, useState } from "react";
import "../styles/Nav.css";
import { Link } from "react-router-dom";

function Nav({ loginRegisterPage }) {
  const [show, handleShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
    return () => {
      window.addEventListener("scroll", () => {
		window.removeEventListener("scroll");
	  });
      ;
    };
  }, []);

  return (
    <div
      className={`${loginRegisterPage ? "nav__loginRegister" : "nav "} ${
        show && "nav__black"
      } `}
    >
      <Link to="/">
        <img
          className={`${
            loginRegisterPage ? "nav__logoLoginRegister" : "nav__logo"
          }`}
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          alt="Netflix "
        />
      </Link>
      <img
        className={`nav__avatar ${loginRegisterPage && "nav__avatarHidden"}`}
        src="https://pbs.twimg.com/media/D8tCa48VsAA4lxn.jpg:large"
        alt="Netflix Logo"
      />
    </div>
  );
}

export default Nav;
