import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
const Nav = ({ isLibOpen, setisLibOpen }) => {
  const ClickHandler = () => {
    setisLibOpen(!isLibOpen);
  };
  return (
    <nav className="nav">
      <h1>Wawes</h1>
      <button onClick={() => ClickHandler()}>
        <FontAwesomeIcon icon={faMusic} size="lg" />
        <h5>Library</h5>
      </button>
    </nav>
  );
};
export default Nav;
