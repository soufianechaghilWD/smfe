import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Header from './Header';
import "../styles/AllSugg.css"

const useStyles = makeStyles((theme) => ({
    moy: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
    small: {
        width: theme.spacing(4),
        height: theme.spacing(4),
      }
  }));

function AllSugg() {

    const classes = useStyles();


    const returnSugg = () => {
        return <div className="sugg__sugg">
                <Avatar className={classes.small} alt="Poster" src="https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png" />
                <h5>Suugestion1<br /><span>Suggestion for you</span></h5>
                <p>Follow</p>
        </div>
    }

    return (
        <div className="allsugg">
            <Header />
            <h1>All Suggestions</h1>
            <div className="allsugg__content">
                {returnSugg()}
            </div>
        </div>
    )
}

export default AllSugg
