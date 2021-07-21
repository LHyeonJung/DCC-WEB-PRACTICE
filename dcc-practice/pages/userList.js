import React from 'react';
import Header from '../components/public/Header';
import { Grid } from "@material-ui/core";
import SideTab from '../components/SideTab';
import UserListComponent from '../components/UserListComponent';

// https://blog.daum.net/junek69/72

const UserList = () => {
    return (
        <div>
            <Header/>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={4}>
                    <SideTab/>
                </Grid>
                <Grid item xs={12} sm={8} style={{background: 'beige', color:'black'}}>
                    <UserListComponent/>
                </Grid>
            </Grid>
        </div>
    );
};

export default UserList;
