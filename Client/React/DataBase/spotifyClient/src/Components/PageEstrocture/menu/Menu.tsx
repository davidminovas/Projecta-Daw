import { Link } from "react-router";

const Menu = () => {
    return (
        <nav>
            <Link to="/Play">Reproduction</Link>
            <Link to="/Artist">Artist</Link>
            <Link to="/Song">Song </Link>
        </nav>
    )
}
export default Menu;