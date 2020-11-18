import React from 'react';
import { CircularProgress, Backdrop, makeStyles, Modal } from '@material-ui/core';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme)=>({
    backdrop: {
        zIndex: theme.zIndex.drawer + 400,
    },
}))

const Loader = (props)=>{
    const {isLoading} = props;

    const classes = useStyles();
    return(
        <React.Fragment>
            {props.children}
            <Backdrop className={classes.backdrop} open={isLoading}>
                <CircularProgress title="Please wait..." />
            </Backdrop>
        </React.Fragment>
    );
}

const mapStateToProps = (state) => {
    const { LoadingModel } = state;
    return {
        isLoading : LoadingModel.isLoading,
    };
  };

export default connect(mapStateToProps, null)(Loader);        