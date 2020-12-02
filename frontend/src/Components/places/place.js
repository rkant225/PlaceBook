import { Grid, IconButton, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import ExploreIcon from '@material-ui/icons/Explore';
import { useParams } from 'react-router-dom';
import DeleteConfirmationModal from './deleteConfirmationModal';
import {BASE_ASSET_URL} from '../../Config/index';
import { connect } from 'react-redux';

const Place = (props)=>{
    const {loggedInUserDetails, currentlySelectedUser} = props;
    const {place, onPlaceEdit, onPlaceDelete, onOpenPlaceOnGoogleMaps} = props;
    const {userId} = useParams();

    const canDisplayThisActionItem = () =>{
        let displayActionItem = false;
        if(loggedInUserDetails && currentlySelectedUser){
            if(place && place.userId && place.userId.id){
                displayActionItem = loggedInUserDetails.id == place.userId.id 
            } else {
                displayActionItem = loggedInUserDetails.id == currentlySelectedUser.id 
            }
        }
        
        return displayActionItem;
    }

    const getCreatorName = () =>{
        let creatorName = "";
        if(place && place.userId && place.userId.id && place.userId.name){
            creatorName =  loggedInUserDetails.id == place.userId.id ? 'You' : place.userId.name;
        } 
        return creatorName;
    }

    return(
        <React.Fragment>
            <Grid key={place.id} item xs={12} md={3} >
                <div style={{border : '1px solid #dddddd', borderRadius : '.1rem'}}>
                    {/* To Do */}
                    {/* Please Uncomment this part once you have paid server, Currently I am commenting this part because from heroku Images get deleted in every 30 minutes */}
                    {/* <div style={{minHeight : '12rem',width : '100%', backgroundImage : `URL(${BASE_ASSET_URL}/${place.imageURL})`, backgroundSize : 'cover'}}></div> */}
                    <div style={{minHeight : '12rem',width : '100%', backgroundImage : `URL(https://picsum.photos/id/${Math.round(Math.random() * 100)}/500)`, backgroundSize : 'cover'}}></div>

                    <div style={{padding : '.5rem', minHeight : '16rem'}}>

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

                        {getCreatorName() && 
                            <Typography align="right" style={{fontWeight : 500}}>
                                - By {getCreatorName()}
                            </Typography>
                        }

                    </div>
                    
                    <div style={{textAlign : 'right'}}>
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
                            <ExploreIcon fontSize="small" />
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