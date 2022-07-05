import { useContext } from "react";
import {ThemeContext} from "./ThemeChanger";
import theme from "./theme.css";
function NavBar()
{
    return (
        <>
            <div>Navbar</div>
            <Options></Options>
            <Options></Options>
            <Options></Options>
            <Options></Options>
            <Options></Options>
            <div>-----------------------</div>
        </>
    )
}

function Options(){
    let CTheme = useContext(ThemeContext);
    return <div className={CTheme =="light" ? "light" : "dark"}>Options</div>
}

export default NavBar;