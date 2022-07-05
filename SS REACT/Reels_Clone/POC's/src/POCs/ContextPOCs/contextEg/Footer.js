import { useContext } from "react";
import {ThemeContext} from "./ThemeChanger";
import theme from "./theme.css";
function Footer(){
    return(
        <>
            <div>Footer</div>
            <Options></Options>
            <div>-------------------------</div>
        </>
    )
}

function Options(){
    let CTheme = useContext(ThemeContext);
    return <div className={CTheme =="light" ? "light" : "dark"}>
        footerText
    </div>
}

export default Footer;