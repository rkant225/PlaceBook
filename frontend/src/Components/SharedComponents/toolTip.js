import React, { useState } from 'react';
import { Button, makeStyles, ClickAwayListener, Tooltip } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles(theme => ({
    messageStyle : {
        marginLeft : '.6rem',
        color : '#000000',
        fontSize: '1rem',
        fontWeight: 400,
        [theme.breakpoints.down('md')] : {
            fontSize : '1rem',
        },
    },
    toolTip : {
        maxWidth : 500,
        backgroundColor : '#3f51b5',
        padding : '.5rem',
        lineHeight : '1.2rem'
    }
}));

const ToolTip = (props) => {
    const { disableHover, message } = props;

    const [openToolTip, setOpenToolTip] = useState(false);

    const handleTooltipOpen = () =>{
        setOpenToolTip(true);
    }

    const handleTooltipClose = () =>{
        setOpenToolTip(false);
    }

    const classes = useStyles();

    return (
        <React.Fragment>
            <ClickAwayListener onClickAway={handleTooltipClose}>

                {disableHover ? 

                    <Tooltip classes={{ tooltip: classes.toolTip }} title={<span style={{fontSize : '.8rem'}}>{message}</span>} arrow onClose={handleTooltipClose} open={openToolTip}>
                        <Button disableTouchRipple disableElevation disableFocusRipple disableRipple style={{ minWidth: '2rem', backgroundColor: 'transparent', outline: 'none', border : 'none', color : '#3f51b5', display : 'inline-block'}} className={classes.button} endIcon={<InfoIcon/>} onClick={handleTooltipOpen}/>
                    </Tooltip>

                    : 

                    <Tooltip classes={{ tooltip: classes.toolTip }} title={<span style={{fontSize : '.8rem'}}>{message}</span>} arrow>
                        <Button disableTouchRipple disableElevation disableFocusRipple disableRipple style={{ minWidth: '2rem', backgroundColor: 'transparent', outline: 'none', border : 'none', color : '#3f51b5', display : 'inline-block'}} className={classes.button} endIcon={<InfoIcon/>}/>
                    </Tooltip>

                }
            </ClickAwayListener>
        </React.Fragment>
    );
}

export default ToolTip;


