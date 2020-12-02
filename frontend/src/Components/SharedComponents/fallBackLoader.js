import React from 'react';
import { CircularProgress, Backdrop, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme)=>({
    backdrop: {
        zIndex: theme.zIndex.drawer + 400,
    },
}))

const FallBackLoader = ()=>{

    const classes = useStyles();
    return(
        <React.Fragment>
            <Backdrop className={classes.backdrop} open={true}>
                <CircularProgress title="Please wait..." />
            </Backdrop>
        </React.Fragment>
    );
}

export default FallBackLoader;        