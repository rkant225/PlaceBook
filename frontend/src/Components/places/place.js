import { Grid, IconButton, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import StreetviewIcon from '@material-ui/icons/Streetview';
import { useParams } from 'react-router-dom';
import DeleteConfirmationModal from './deleteConfirmationModal';
import { connect } from 'react-redux';

const Place = (props)=>{
    const {loggedInUserDetails, currentlySelectedUser} = props;
    const {place, onPlaceEdit, onPlaceDelete, onOpenPlaceOnGoogleMaps} = props;
    const {userId} = useParams();

    const canDisplayThisActionItem = () =>{
        return loggedInUserDetails.id == currentlySelectedUser.id;
    }

    return(
        <React.Fragment>
            <Grid key={place.id} item xs={12} md={3} >
                <div style={{border : '1px solid #dddddd', borderRadius : '.1rem'}}>

                    <div style={{minHeight : '12rem',width : '100%', backgroundImage : `URL(${place.imageURL})`, backgroundSize : 'cover'}}></div>

                    <div style={{padding : '.5rem', minHeight : '13rem'}}>
                        <Typography style={{fontSize : '1.7rem'}}>
                            <b>{place.title}</b>
                        </Typography>
                        <Typography>
                            <b>Address</b>
                            <br/>
                            {place.address}
                        </Typography>
                        <Typography>
                            <b>Description</b> 
                            <br/>
                            {place.description}
                        </Typography>
                    </div>
                    
                    <div style={{textAlign : 'right'}}>
                        {/* <IconButton onClick={()=>{console.log('hahaha')}} title="Delete"> */}
                        {canDisplayThisActionItem() && 
                            <IconButton onClick={()=>onPlaceDelete(place)} title="Delete">
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        }
                        
                        {canDisplayThisActionItem() && 
                            <IconButton onClick={()=>onPlaceEdit(place)} title="Edit">
                                <BorderColorIcon fontSize="small" />
                            </IconButton>
                        }

                        <IconButton onClick={()=>onOpenPlaceOnGoogleMaps(place)} title="View on map">
                            <StreetviewIcon fontSize="small" />
                        </IconButton>
                    </div>
                </div>
            </Grid>

        </React.Fragment>
    );
}

const mapStateToProps =(state)=>{
    const {LoginModel, UsersModel} = state;
    return{
        loggedInUserDetails : LoginModel.loggedInUserDetails,
        currentlySelectedUser : UsersModel.currentlySelectedUser,

    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        dispatch,
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Place);