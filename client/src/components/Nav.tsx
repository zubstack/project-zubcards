import "./Nav.scss";

function Nav() {
  return (
    <nav>
      <ul className="menu">
        <li className="menu__item">
          <a href="">Zubscards</a>
        </li>
        <div className="flex">
          <li className="menu__item">
            <a href="">Decks</a>
          </li>
          <li className="menu__item">
            <a href="">User</a>
          </li>
        </div>
      </ul>
    </nav>
  );
}

export default Nav;
