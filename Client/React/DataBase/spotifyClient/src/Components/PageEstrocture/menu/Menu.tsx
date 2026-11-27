import { Link } from "react-router";

const Menu = () => {
    return (
        <nav>
            <Link to="/Play">Reproduction</Link>
            <Link to="/Song">Song </Link>
            <Link to="/Artist">Artist</Link>
            <Link to="/Album">Album </Link>
        </nav>
    )
}
export default Menu;