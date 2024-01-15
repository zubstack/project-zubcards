import { FaUserLarge } from "react-icons/fa6";
import "./Nav.scss";
import { useEffect, useRef, useState } from "react";

function Nav() {
  const [openToggle, setOpenToggle] = useState(null);
  const menuRef = useRef();
  useEffect(() => {
    document.addEventListener("mousedown", (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpenToggle(false);
      }
    });
  }, []);
  return (
    <nav>
      <ul className="menu">
        <li id="logo" >
          <a href="">Zubcards</a>
        </li>
        <li className="menu__item">
          <a href="">Decks</a>
        </li>
        <li >
          <div className="dropdown flex" ref={menuRef}>
            <FaUserLarge
              onClick={(): void => setOpenToggle(!openToggle)}
              className={"dropdown__icon"}
            />

            <ul
              className={`dropdown__menu ${
                openToggle ? "dropdown__menu--active" : ""
              }`}
            >
              <li className="dropdown__menu__item">Decks</li>
              <li className="dropdown__menu__item">Profile</li>
              <li className="dropdown__menu__item">Settings</li>
              <li className="dropdown__menu__item">Log out</li>
            </ul>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
