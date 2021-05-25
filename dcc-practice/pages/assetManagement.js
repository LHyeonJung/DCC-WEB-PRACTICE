import Header from '../components/public/Header';
import { Grid, Box, Button, Typography } from "@material-ui/core";
import SideTab from '../components/SideTab';
import AssetManagementComponent from '../components/AssetManagementComponent';

const AssetManagement = () => {
    console.log("AssetManagement 렌더링");
    return (
        <div>
            <Header/>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={4}>
                    <SideTab/>
                </Grid>
                <Grid item xs={12} sm={8} style={{background: 'beige', color:'black'}}>
                    <AssetManagementComponent/>
                </Grid>
            </Grid>
        </div>
    );
};

export default AssetManagement;