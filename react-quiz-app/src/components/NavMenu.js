import { Link } from "react-router-dom";

const NavMenu = () => {
  return (
    <header>
      <div className="header-container">
        <nav className="main-nav">
          <Link to="/" style={{ textAlign: "center", width: "100%" }}>
            <h1 className="logo" >Wealth Quest</h1>
          </Link>
         <ul>
          <li>
              <Link to="/quizboard" className="fw-bold link-primary">
                Quizboard
              </Link>
            </li>
            </ul>
        </nav>
      </div>
    </header>
  );
};

export { NavMenu };
