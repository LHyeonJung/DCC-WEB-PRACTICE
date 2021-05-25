import Header from '../components/public/Header';
import { Grid, Box, Button, Typography } from "@material-ui/core";
import SideTab from '../components/SideTab';
import DashboardComponent from '../components/DashboardComponent';

const Dashboard = () => {
    console.log("Dashboard 렌더링");
    return (
        <div>
            <Header/>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={4}>
                    <SideTab/>
                </Grid>
                <Grid item xs={12} sm={8} style={{background: 'beige', color:'black'}}>
                    {/* <h1 >
                         Dashboard page!
                    </h1> */}
                    <DashboardComponent/>
                </Grid>
            </Grid>
        </div>
    );
};

export default Dashboard;