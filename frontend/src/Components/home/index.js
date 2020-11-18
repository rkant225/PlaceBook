import { Grid, Paper } from '@material-ui/core';
import React from 'react';
import UsersList from './usersList';

const Home = (props)=>{
    const {history} = props;
    const USERS = [
        {id : 1, firstName : 'Rahul', places : 5, imageURL : `https://picsum.photos/id/${Math.round(Math.random() * 100)}/50`},
        {id : 2, firstName : 'Ravi', places : 5, imageURL : `https://picsum.photos/id/${Math.round(Math.random() * 100)}/50`},
        {id : 3, firstName : 'Rohit', places : 5, imageURL : `https://picsum.photos/id/${Math.round(Math.random() * 100)}/50`},
        {id : 4, firstName : 'Raman', places : 5, imageURL : `https://picsum.photos/id/${Math.round(Math.random() * 100)}/50`},
        {id : 5, firstName : 'Raghav', places : 5, imageURL : `https://picsum.photos/id/${Math.round(Math.random() * 100)}/50`},
        {id : 6, firstName : 'Raghav', places : 5, imageURL : `https://picsum.photos/id/${Math.round(Math.random() * 100)}/50`},
        {id : 7, firstName : 'Raghav', places : 5, imageURL : `https://picsum.photos/id/${Math.round(Math.random() * 100)}/50`},
        {id : 8, firstName : 'Raghav', places : 5, imageURL : `https://picsum.photos/id/${Math.round(Math.random() * 100)}/50`},
        {id : 9, firstName : 'Raghav', places : 5, imageURL : `https://picsum.photos/id/${Math.round(Math.random() * 100)}/50`},
        {id : 10, firstName : 'Raghav', places : 5, imageURL : `https://picsum.photos/id/${Math.round(Math.random() * 100)}/50`},
        {id : 11, firstName : 'Raghav', places : 5, imageURL : `https://picsum.photos/id/${Math.round(Math.random() * 100)}/50`},
        {id : 12, firstName : 'Raghav', places : 5, imageURL : `https://picsum.photos/id/${Math.round(Math.random() * 100)}/50`},
    ];
    console.log(props)
    return(
        <React.Fragment>
            <UsersList users={USERS} history={history}/>
        </React.Fragment>
    );
}

export default Home;