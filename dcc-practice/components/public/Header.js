import React, { Component, useState } from 'react';
import Link from 'next/link';
import { Grid, Box, Button, Typography } from "@material-ui/core";
import logo from '../../images/Light/Light_logo_m.png';
import SideTab from '../SideTab';

// const linkStyle = {
//     marginRight: '1rem'
// }
// const Header = () => {
    
function Header () {
    console.log("Header 렌더링");
    return (
        <div>
            <Grid container spacing={1}> 
                <Grid item xs={12} sm={4} className="Grid_Logo"> 
                    <img src={logo} alt="logo" style={{display:"block", margin: "0 auto"}}/>
                </Grid>
                <Grid item xs={12} sm={5} className="Grid_Menu">
                    <Button color="default" size="small">
                        <Link href="/dashboard">
                            <div>대시보드</div>
                        </Link>
                    </Button>
                    <Button color="default" size="small">
                         <Link href="/assetManagement">
                            <div>자산 관리</div>
                         </Link>
                    </Button>
                    <Button color="default" size="small">
                         <Link href="/encryption">
                            <div>암호화</div>
                         </Link>
                    </Button>
                    <Button color="default" size="small">
                         <Link href="/accessControl">
                            <div>접근 제어</div>
                         </Link>
                    </Button>
                    <Button color="default" size="small">
                         <Link href="/log">
                            <div>로그</div>
                         </Link>
                    </Button>
                    <Button color="default" size="small">
                         <Link href="/setting">
                            <div>설정</div>
                         </Link>
                    </Button>
                </Grid>
                <Grid item xs={12} sm={3} className="Grid_Default">
                        <Box p={2}>
                    Utility
                    </Box>
                </Grid>
                {/* <Grid item xs={12} sm={4} >
                    <SideTab/>
                </Grid> */}
            </Grid>
        </div>
    );
};

export default Header;