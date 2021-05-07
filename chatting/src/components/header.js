import { AppBar, Button, IconButton, Toolbar, Typography } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import { useContext } from "react";

import app_config from '../config';
import { Link } from "react-router-dom";

const Header = () => {

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
        link: {
            color: 'white',
            textDecoration: 'none'
        }

    }));

    const classes = useStyles();

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    {app_config.projectTitle}
                </Typography>
                <Link to="/login" className={classes.link}>
                    <Button color="inherit">Login</Button>
                </Link>

                <Link to="/register" className={classes.link}>
                    <Button color="inherit">Register</Button>
                </Link>

                <Link to="/chat" className={classes.link}>
                    <Button color="inherit">Chat</Button>
                </Link>

                

            </Toolbar>
        </AppBar>
    )
}


export default Header;