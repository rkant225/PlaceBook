import React from 'react';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import { Button, Typography } from '@material-ui/core';

const NoPlacesFound = (props)=>{
    const {history} = props;
    return(
        <div style={{width : '100%', textAlign : 'center', marginTop : '5rem'}}>
                    
            <Typography style={{fontSize : '1.7rem'}}>
                No places found.
            </Typography>

            <div>
                <SentimentVeryDissatisfiedIcon fontSize="large"/>
            </div>

            <Button onClick={()=>history.push('/add-place')} style={{marginTop : '5rem'}} variant="contained" color="primary">Add new place</Button>

        </div>
    );
}

export default NoPlacesFound;