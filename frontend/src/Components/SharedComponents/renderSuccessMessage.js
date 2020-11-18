import React from 'react';
import { Snackbar, Typography, SnackbarContent, makeStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import {hideServerSuccessMessage, displayServerSuccessMessage} from '../../Redux/Actions/serverSuccessActions';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';

const useStyles  = makeStyles(theme => ({
    snackBarStyle : {
        left : '8%',
        transform: 'translateX(-8%)',
        borderLeft : '.3rem solid #3f51b5'
    },
    snackBarContent : {
        backgroundColor:'white',
        color : '#3f51b5',
        fontSize : '1rem',
        fontWeight: 400,
        [theme.breakpoints.down('md')] : {
            fontSize : '1rem',
        },
    },
    iconAndMessageContainer : {
        display : 'flex',
        justifyContent : 'center',
        alignItems : "center",
        height : '100%',
        width : '100%'
    },
    iconStyle : {
        height : '2rem',
        width : '2rem',
        [theme.breakpoints.down('md')] : {
            height : '1rem',
            width : '1rem',
        },
    },
    messageStyle : {
        marginLeft : '.6rem',
        color : '#000000',
        fontSize: '1rem',
        fontWeight: 400,
        [theme.breakpoints.down('md')] : {
            fontSize : '1rem',
        },
    }
}));

const RenderSuccessMessage = (props)=>{
    const {successMessage, hasSuccessMessage, hideServerSuccessMessage} = props;
    const classes = useStyles();
    return(
        <React.Fragment>
            {props.children}
            <Typography align="left" variant="inherit">
                <Snackbar className={classes.snackBarStyle}  open={hasSuccessMessage} autoHideDuration={5000} onClose={hideServerSuccessMessage}>
                    <SnackbarContent className={classes.snackBarContent} message={
                        <div className={classes.iconAndMessageContainer}> 
                            <CheckCircleOutlineOutlinedIcon className={classes.iconStyle}/>
                            <div className={classes.messageStyle}>{successMessage}</div>
                        </div>
                    }/>
                </Snackbar>
            </Typography>
        </React.Fragment>
    );
}

const mapStateToProps = (state) => {
    const { ServerSuccessModal } = state;
    return {
        successMessage : ServerSuccessModal.successMessage,
        hasSuccessMessage : ServerSuccessModal.hasSuccessMessage
    };
  };

export default connect(mapStateToProps, {hideServerSuccessMessage, displayServerSuccessMessage})(RenderSuccessMessage);