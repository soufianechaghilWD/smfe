import React, { useState, useEffect} from 'react'
import { useStateValue } from "./StateProvider";
import Logo from '../files/Logo.png'
import '../styles/Header.css'
import SearchIcon from '@material-ui/icons/Search';
import Avatar from '@material-ui/core/Avatar';
import SettingsIcon from '@material-ui/icons/Settings';
import AddBoxIcon from '@material-ui/icons/AddBox';


function Header() {

    const [ state , dispatch] = useStateValue();

    /* This is the part that makes the header sticky  */

    const fixedText = "I am fixed :)";
    const whenNotFixed = "I am not a fixed header :(";
    const [headerText, setHeaderText] = useState(whenNotFixed);
    useEffect(() => {
        const header = document.getElementById("myHeader");
        const sticky = header.offsetTop;
        const scrollCallBack = window.addEventListener("scroll", () => {
          if (window.pageYOffset > sticky) {
            header.classList.add("sticky");
            if (headerText !== fixedText) {
              setHeaderText(fixedText);
            }
          } else {
            header.classList.remove("sticky");
            if (headerText !== whenNotFixed) {
              setHeaderText(whenNotFixed);
            }
          }
        });
        return () => {
          window.removeEventListener("scroll", scrollCallBack);
        };
      }, []);
    /*------------------------------------*/ 
    return (
        <div className="header" id="myHeader">
             
            <div className="header__logo">
                <img src={Logo} alt="" />
            </div>  
            <div className="header__search">
                <div className="header__search__con">
                    <input type="text" placeholder="Search"/>
                    <SearchIcon />
                </div>  
            </div>         
            <div className="header__bu">
                <div className="header__bu__user">
                    <h2>{state?.user?.user?.displayName.charAt(0).toUpperCase() + state?.user?.user?.displayName.slice(1)}</h2>
                    <Avatar alt={state?.user?.user?.displayName} src={state?.user?.user?.photoURL} />
                </div>
                <AddBoxIcon className="header__bu__ic"/>
                <SettingsIcon className="header__bu__ic"/>
            </div>
        </div>
    )
}

export default Header
