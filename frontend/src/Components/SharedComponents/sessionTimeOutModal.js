import React from 'react';
import { connect } from 'react-redux';
import { Button, makeStyles, Modal, Paper, Typography } from '@material-ui/core';
import * as Actions from '../../Redux/Actions/sessionTimeOutActions';
import * as LoginActions from '../../Redux/Actions/loginActions';
import { useHistory } from 'react-router-dom';


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

const SessionTimeOutModal = (props)=>{
    const history = useHistory();
    const {isSessionTimeOutModalOpen, closeSessionTimeOutModalOpen, openSessionTimeOutModalOpen, reNewAccessToken} = props;

    const closeModalAndReloadThePage =()=>{
        closeSessionTimeOutModalOpen();
        const refresh_token = sessionStorage.getItem('refresh_token');
        reNewAccessToken(refresh_token);
        // window.location.href = history.location.pathname;
    }

    const classes = useStyles();

    return(
        <Modal open={isSessionTimeOutModalOpen}>
            <Paper className={classes.paper} >
                <Typography style={{backgroundColor : '#3f51b5', color : 'white', padding : '.5rem'}}>Delete Confirmation</Typography>
                <div style={{padding : '1rem'}}>
                    <Typography style={{fontWeight : '900'}}>Your session is about to expire, Please click on OK to retain other wile you will be logged out automaticly.</Typography>

                    <Typography align="right" style={{marginTop : '1rem'}}>
                        <Button onClick={closeModalAndReloadThePage} style={{marginRight : '1rem'}} variant="contained" color="primary">OK</Button>
                    </Typography>
                </div>
            </Paper>
        </Modal>
    );
}

const mapStateToProps = (state) => {
    const { SessionTimeOutModel } = state;
    return {
        isSessionTimeOutModalOpen : SessionTimeOutModel.isSessionTimeOutModalOpen,
    };
  };

const mapDispatchToProps = (dispatch)=>{
    return {
        dispatch,
        closeSessionTimeOutModalOpen : ()=> dispatch(Actions.closeSessionTimeOutModalOpen()),
        openSessionTimeOutModalOpen : ()=> dispatch(Actions.openSessionTimeOutModalOpen()),
        reNewAccessToken : (refresh_token)=> dispatch(LoginActions.reNewAccessToken(refresh_token)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SessionTimeOutModal);