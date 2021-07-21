import React from 'react';
import Header from '../components/public/Header';
import { Grid } from "@material-ui/core";
import SideTab from '../components/SideTab';
import EnrollUserComponent from '../components/EnrollUserComponent';

const EnrollUser = () => {
    return (
        <div>
            <Header/>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={4}>
                    <SideTab/>
                </Grid>
                <Grid item xs={12} sm={8} style={{background: 'beige', color:'black'}}>
                    <EnrollUserComponent/>
                </Grid>
            </Grid>
        </div>
    );
};

export default EnrollUser;