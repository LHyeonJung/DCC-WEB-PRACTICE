import Header from '../components/public/Header';
import { Grid, Box, Button, Typography } from "@material-ui/core";
import SideTab from '../components/SideTab';
import SettingComponent from '../components/SettingComponent';

const Setting = () => {
    console.log("Setting 렌더링");
    return (
        <div>
            <Header/>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={4}>
                    <SideTab/>
                </Grid>
                <Grid item xs={12} sm={8} style={{background: 'beige', color:'black'}}>
                    <SettingComponent/>
                </Grid>
            </Grid>
        </div>
    );
};

export default Setting;