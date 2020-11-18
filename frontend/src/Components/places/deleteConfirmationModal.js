import { Button, makeStyles, Modal, Paper, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: '30%',
        [theme.breakpoints.down('md')]: {
            width: '90%',
        },
        backgroundColor: theme.palette.background.paper,
        borderRadius : '0px',
        outline : 'none',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
  }));

const DeleteConfirmationModal = (props)=>{
    const {onClose, onDeleteConfirmationClick} = props;

    const classes = useStyles();

    return(
        <Modal open={true} onClose={onClose}>
            <Paper className={classes.paper} >
                <Typography style={{backgroundColor : '#3f51b5', color : 'white', padding : '.5rem'}}>Delete Confirmation</Typography>
                <div style={{padding : '1rem'}}>
                    <Typography style={{fontWeight : '900'}}>Are you sure that you want to delete this place permanently?</Typography>

                    <Typography align="right" style={{marginTop : '1rem'}}>
                        <Button onClick={onClose} style={{marginRight : '1rem'}} variant="contained" color="primary">No</Button>
                        <Button onClick={onDeleteConfirmationClick} variant="contained" color="secondary">Yes</Button>
                    </Typography>
                </div>
            </Paper>
        </Modal>
    );
}

export default DeleteConfirmationModal;