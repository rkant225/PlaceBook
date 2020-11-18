import { AppBar, Divider, Drawer, Hidden, IconButton, List, ListItemIcon, ListItemText, makeStyles, Toolbar, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import GroupIcon from '@material-ui/icons/Group';
import PlaceIcon from '@material-ui/icons/Place';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import FaceIcon from '@material-ui/icons/Face';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    siteHeader : {
        fontSize : '2rem',
        [theme.breakpoints.down('md')]: {
            fontSize: '1.5rem',
        }
    },
    linkStyle: {
        alignItems : 'center',
        padding : '.5rem',
        transition: 'all .2s ease-in-out',
        color : 'white',
        textDecoration : 'none',
        marginRight : '.5rem',
        "&:hover": {
            transform: "scale(1.15)",
            cursor : "pointer",
        }
    },
    activeTab : {
        borderBottom : '3px solid white'
    },
    list: {
        width: 250,
    },
}));


const Header = (props)=>{
    const {history} = props;
    const {isAuthenticated, currentUserDetails} = props;
    const {name} = currentUserDetails;

    const [openSideDrawar, setOpenSideDrawar] = React.useState(false);

    const handleNavigationMenuClick = (menuName)=>{
        console.log('menuName', menuName)
        if(menuName === 'ALL_USERS'){
            history.push('/');
        }
        if(menuName === 'OPEN_MY_PLACES'){
            history.push('/places/123');
        }
        if(menuName === 'ADD_NEW_PLACE'){
            history.push('/add-place');
        }
        if(menuName === 'LOGIN'){
            history.push('/login');
        }
        if(menuName === 'LOGOUT'){
            history.push('/logout');
        }

        setOpenSideDrawar(false)
    }


    const classes = useStyles();

    return(
        <React.Fragment>
            <AppBar position="static">
                <Toolbar>

                    {/* This section will be displayed for Desktop */}
                    <Hidden only={['xs', 'sm']}>
                        <Typography onClick={()=>{history.push('/')}} className={classes.siteHeader} style={{ flexGrow : 12, cursor : 'pointer'}}>
                            PlaceBook - Explore Places
                        </Typography>
                        <NavLink to="/" exact className={classes.linkStyle} activeClassName={classes.activeTab}>
                            <Typography>All Users</Typography>
                        </NavLink>
                        {isAuthenticated && 
                            <NavLink to="/places/123" className={classes.linkStyle} activeClassName={classes.activeTab}>
                                <Typography>My Places</Typography>
                            </NavLink>
                        }
                        {isAuthenticated && 
                            <NavLink to="/add-place" className={classes.linkStyle} activeClassName={classes.activeTab}>
                                <Typography>Add Place</Typography>
                            </NavLink>
                        }
                        {!isAuthenticated && 
                            <NavLink to="/login" className={classes.linkStyle} activeClassName={classes.activeTab}>
                                <Typography>Login</Typography>
                            </NavLink>
                        }
                        {isAuthenticated && 
                            <NavLink to="/logout" className={classes.linkStyle} activeClassName={classes.activeTab}>
                                <Typography>LogOut</Typography>
                            </NavLink>
                        }
                        {/* <Typography className={classes.linkStyle} onClick={()=>{handleNavigationMenuClick('OPEN_MY_PLACES')}} align="right" style={{flexGrow :  1}}>
                            My Places
                        </Typography>
                        <Typography className={classes.linkStyle} onClick={()=>{handleNavigationMenuClick('ADD_NEW_PLACE')}} align="right" style={{flexGrow :  1}}>
                            Add New Place
                        </Typography>
                        <Typography className={classes.linkStyle} onClick={()=>{handleNavigationMenuClick('LOGIN')}} align="right" style={{flexGrow :  1}}>
                            Login
                        </Typography>
                        <Typography className={classes.linkStyle} onClick={()=>{handleNavigationMenuClick('LOGOUT')}} align="right" style={{flexGrow :  1}}>
                            LogOut
                        </Typography> */}
                        {isAuthenticated && 
                            <Typography className={classes.linkStyle} onClick={()=>{history.push('/')}} align="right" style={{flexGrow :  1}}>
                                {name}
                            </Typography>
                        }
                    </Hidden>



                    {/* This section will be displayed for Mobile */}
                    <Hidden only={['md', 'lg', 'xl']}>
                        <IconButton onClick={()=>{setOpenSideDrawar(true)}} edge="start" color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography onClick={()=>{history.push('/')}} className={classes.siteHeader} style={{ flexGrow : 12, cursor : 'pointer'}}>
                            PlaceBook
                        </Typography>
                        
                        {isAuthenticated && 
                            <div onClick={()=>{history.push('/')}} style={{width : '100%', textAlign : 'right'}}>
                                {name}
                            </div>
                        }

                        <Drawer anchor={'left'} open={openSideDrawar} onClose={()=>{setOpenSideDrawar(false)}}>
                            <div className={classes.list}>
                                <List>
                                    <ListItem button>
                                        {/* <ListItemIcon><GroupIcon /></ListItemIcon> */}
                                        <ListItemText primary={'PlaceBook - Explore Places'} />
                                    </ListItem>

                                    <ListItem button onClick={()=>handleNavigationMenuClick('ALL_USERS')}>
                                        <ListItemIcon><GroupIcon /></ListItemIcon>
                                        <ListItemText primary={'All Users'} />
                                    </ListItem>

                                    {isAuthenticated && 
                                        <ListItem button onClick={()=>handleNavigationMenuClick('OPEN_MY_PLACES')}>
                                            <ListItemIcon><PlaceIcon /></ListItemIcon>
                                            <ListItemText primary={'My Places'} />
                                        </ListItem>
                                    }

                                    {isAuthenticated && 
                                        <ListItem button onClick={()=>handleNavigationMenuClick('ADD_NEW_PLACE')}>
                                            <ListItemIcon><AddLocationIcon /></ListItemIcon>
                                            <ListItemText primary={'Add New Place'} />
                                        </ListItem>
                                    }

                                    {!isAuthenticated && 
                                        <ListItem button onClick={()=>handleNavigationMenuClick('LOGIN')}>
                                            <ListItemIcon><FaceIcon /></ListItemIcon>
                                            <ListItemText primary={'Login'} />
                                        </ListItem>
                                    }

                                    {isAuthenticated && 
                                        <ListItem button onClick={()=>handleNavigationMenuClick('LOGOUT')}>
                                            <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                                            <ListItemText primary={'LogOut'} />
                                        </ListItem>
                                    }
                                    <Divider />
                                </List>
                            </div>
                        </Drawer>
                    </Hidden>

                </Toolbar>
            </AppBar>
            <div>
                
            </div>
        </React.Fragment>
    );
}

const mapStateToProps =(state)=>{
    const {LoginModel} = state;
    return{
        isAuthenticated : LoginModel.isAuthenticated,
        currentUserDetails : LoginModel.currentUserDetails
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        dispatch,
    }
}

const HeaderwithRedux = connect(mapStateToProps, mapDispatchToProps)(Header);

export default withRouter(HeaderwithRedux);
