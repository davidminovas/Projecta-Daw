import { Link } from "react-router";

const Menu = () => {
    return (
        <nav>
            <Link to="/Play">Reproduction</Link>
            <Link to="/SongManagement">Gestio cançons</Link>
        </nav>
    )
}
export default Menu;