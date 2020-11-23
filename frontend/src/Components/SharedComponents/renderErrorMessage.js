import React from 'react';
import { Button, Snackbar, SnackbarContent, Typography, makeStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { hideServerError } from '../../Redux/Actions/serverErrorActions';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';

const useStyles = makeStyles(theme => ({
    snackBarStyle: {
        left: '8%',
        transform: 'translateX(-8%)',
        borderLeft: '.3rem solid red'
    },
    snackBarContent: {
        backgroundColor: 'white',
        color: 'red',
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

const RenderServerError = (props) => {
    const { errorMessage, hasErrorMessage, hideServerError } = props;

    const classes = useStyles();

    return (
        <React.Fragment>
            {props.children}
            <Typography align="left" variant="inherit">
                <Snackbar className={classes.snackBarStyle} open={hasErrorMessage} autoHideDuration={5000} onClose={hideServerError}>
                    <SnackbarContent className={classes.snackBarContent} message={
                        <div className={classes.iconAndMessageContainer}>
                            <CancelOutlinedIcon className={classes.iconStyle} />
                            <div className={classes.messageStyle}>{errorMessage}</div>
                        </div>
                    } />
                </Snackbar>
            </Typography>
        </React.Fragment>
    );
}

const mapStateToProps = (state) => {
    const { ServerErrorModel } = state;
    return {
        errorMessage: ServerErrorModel.errorMessage,
        hasErrorMessage: ServerErrorModel.hasErrorMessage
    };
};

export default connect(mapStateToProps, { hideServerError: hideServerError })(RenderServerError);