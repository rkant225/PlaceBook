import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import {BASE_API_URL} from '../../Config/index';

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



// users: [{places: [], _id: "5fb800ebcb4b351af0346b09", name: "Paritosh Singh", email: "a@a.com",…},…]
// 0: {places: [], _id: "5fb800ebcb4b351af0346b09", name: "Paritosh Singh", email: "a@a.com",…}
// email: "a@a.com"
// id: "5fb800ebcb4b351af0346b09"
// imageURL: "https://picsum.photos/id/93/50"
// name: "Paritosh Singh"
// places: []

const UsersList = (props)=>{
    const {users, history, dispatch} = props;

    const handleUserCardClick = (id) =>{
        history.push(`/places/${id}`)
    }

    const classes = useStyles();
    console.log(users)
    return(
        <React.Fragment>
            <Grid container style={{marginTop : '1rem'}}>
                <Grid item xs={12} md={1}></Grid>
                <Grid container item xs={12} md={10} spacing={3}>
                    {users && users.map((user)=> {

                        const {id, name, email, imageURL, places} = user;

                        return <Grid item xs={12} md={4} key={id}>
                                <div className={classes.containerDiv} onClick={()=>{handleUserCardClick(id)}}>
                                    <div>
                                        {/* <img src={imageURL} style={{borderRadius : '20rem'}}/> */}
                                        <img src={`${BASE_API_URL}/${imageURL}`} style={{borderRadius : '20rem', width : '50px', height : '50px'}}/>
                                    </div>
                                    <div style={{marginLeft : '1rem'}}>
                                        {name}
                                        <br/>
                                        <b>Places : {places.length}</b>
                                    </div>
                                </div>
                            </Grid>
                        }
                    )}
                </Grid>
                <Grid item xs={12} md={1}></Grid>
            </Grid>
        </React.Fragment>
    );
}

const mapStateToProps =(state)=>{
    return { }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        dispatch,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);



