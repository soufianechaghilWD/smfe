import React, { useState, useEffect} from 'react'
import { useStateValue } from "./StateProvider";
import Logo from '../files/Logo.png'
import '../styles/Header.css'
import SearchIcon from '@material-ui/icons/Search';
import Avatar from '@material-ui/core/Avatar';
import SettingsIcon from '@material-ui/icons/Settings';
import AddBoxIcon from '@material-ui/icons/AddBox';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Modal from '@material-ui/core/Modal';
import AddPic from './AddPic';
import { useHistory }from 'react-router-dom';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { makeStyles } from '@material-ui/core/styles';
import Notifications from './Notifications'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
  dropdown: {
    position: 'absolute',
    top: 43,
    right: 100,
    left: -400,
    zIndex: 1,
    border: '1px solid rgba(0, 0, 0, .6)',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    width: 500,
    height: 400,
    overflow: "auto"
  },
  root1: {
    position: 'relative',
  },
  dropdown1: {
    position: 'absolute',
    top: 27,
    right: 0,
    left: "-28%",
    zIndex: 1,
    border: '1px solid rgba(0, 0, 0, .6)',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    width: 400,
    height: 400,
    overflow: "auto"
  },
}));

function Header() {

    const [ state , dispatch] = useStateValue();
    const [open, setOpen] = useState(false);
    const history = useHistory();
    const [openNo, setOpenNo] = useState(false);
    const classes = useStyles();
    const [openSe, setOpenSe] = useState(false)

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
            <div className="header__logo" onClick={() => history.push('/home')}>
                <img src={Logo} alt="" />
            </div>  
            <div className="header__search">
                <div className="header__search__con">
                    <ClickAwayListener onClickAway={() => setOpenSe(false)}>
                      <div id="header__se" className={classes.root1}>
                        <input type="text" placeholder="Search" onClick={() => setOpenSe(true)}/>
                        <SearchIcon />
                        {openSe ? (
                          <div className={classes.dropdown1}>
                            <Notifications  />
                          </div>
                        ) : null}
                      </div>
                    </ClickAwayListener>
                </div>  
            </div>         
            <div className="header__bu">
                <div className="header__bu__user">
                    <h2>{state?.userDB?.username?.charAt(0)?.toUpperCase() + state?.userDB?.username?.slice(1)}</h2>
                    <Avatar alt={state?.user?.user?.displayName} src={state?.user?.user?.photoURL} />
                </div>
                <AddBoxIcon className="header__bu__ic" onClick={() => setOpen(true)} />
                <ClickAwayListener onClickAway={() => setOpenNo(false)}>
                  <div className={classes.root}>
                    <NotificationsIcon className="header__bu__ic" onClick={() => setOpenNo(!openNo)}/>
                    {openNo ? (
                      <div className={classes.dropdown}>
                        <Notifications  />
                        <Notifications  />
                        <Notifications  />
                        <Notifications  />
                        <Notifications  />
                        <Notifications  />
                        <Notifications  />
                        <Notifications  />
                        <Notifications  />
                        <Notifications  />
                        <Notifications  />
                        <Notifications  />
                        <Notifications  />
                      </div>
                    ) : null}
                  </div>
                </ClickAwayListener>
                <SettingsIcon className="header__bu__ic" onClick={() => history.push('/sett')}/>
            </div>
            <Modal
              open={open}
              onClose={() => setOpen(false)}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              className="header__addPic"
            >
              <AddPic />
            </Modal>
        </div>
    )
}

export default Header
