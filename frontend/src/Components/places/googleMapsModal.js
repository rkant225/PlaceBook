import { makeStyles, Modal, Paper } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: '70%',
        [theme.breakpoints.down('md')]: {
            width: '90%',
        },
        backgroundColor: theme.palette.background.paper,
        borderRadius : '0px',
        outline : 'none',
        padding: '1rem',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
  }));

const GoogleMapsModal = (props)=>{
    const {onClose, place} = props;
    const {address} = place;

    const classes = useStyles();

    return(
        <Modal open={true} onClose={onClose}>
            <Paper className={classes.paper} >
                <b>{address}</b>
                <div style={{minHeight : '30rem',width : '100%', backgroundImage : `URL(https://images.indianexpress.com/2017/05/google-maps-759.jpg)`, backgroundSize : 'cover'}}></div>
            </Paper>
        </Modal>
    );
}

export default GoogleMapsModal;