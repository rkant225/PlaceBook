import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    containerDiv: {
        display : 'flex',
        alignItems : 'center',
        padding : '.5rem',
        border : '1px solid black',
        textAlign : 'initial',
        borderRadius : '.2rem',
        backgroundColor : 'black',
        color : 'white',
        transition: 'all .2s ease-in-out',
        "&:hover": {
            transform: "scale(1.15)",
            cursor : "pointer",
            // backgroundColor : 'yellow',
            // color : 'black',
            
            // boxShadow : '3px 3px blueviolet'
        }
    },
}));

const UsersList = (props)=>{
    const {users, history} = props;
    const classes = useStyles();
    console.log(users)
    return(
        <React.Fragment>
            <Grid container style={{marginTop : '1rem'}}>
                <Grid item xs={12} md={1}></Grid>
                <Grid container item xs={12} md={10} spacing={3}>
                    {users && users.map((user)=>
                        <Grid item xs={12} md={4} key={user.id}>
                            <div className={classes.containerDiv} onClick={()=>{history.push(`/places/${user.id}`)}}>
                                <div>
                                    <img src={user.imageURL} style={{borderRadius : '20rem'}}/>
                                </div>
                                <div style={{marginLeft : '1rem'}}>
                                    {user.firstName}
                                    <br/>
                                    <b>Places : {user.id}</b>
                                </div>
                            </div>
                        </Grid>
                    )}
                </Grid>
                <Grid item xs={12} md={1}></Grid>
            </Grid>
        </React.Fragment>
    );
}

export default UsersList;



