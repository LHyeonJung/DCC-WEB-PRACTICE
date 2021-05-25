import React, { useState } from 'react';
import { Grid, Box, Button, Typography } from "@material-ui/core";
import GroupComponent from './GroupComponent';
import ServerComponent from './ServerComponent';

{/*
    Grid의 'container'를 설정: 내부 컴포넌트를 포함하는 컴포넌트가 됨
    Grid의 'item'을 설정: 내부 컴포넌트가 됨
        > 내부 컴포넌트의 경우: lg, md, sm, xl, xs 속성에 1~12 사이의 정수를 입력하면 전체의 (입력값/12)% 만큼의 너비 차지
*/}

const SideTab = () => {
    console.log("SideTab 렌더링");
    let [infoProps, change_infoProps] = useState({userId: "Hyeonjung", connectedIp: "10.0.65.20", connectedPort:"34579"});
    return (
        <div>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={6} className="Grid_Group">
                    <GroupComponent/>
                </Grid>
                <Grid item xs={12} sm={6} className="Grid_Server">
                    <ServerComponent userId={infoProps.userId} ip={infoProps.connectedIp} port={infoProps.connectedPort}/>
                </Grid>

            </Grid>
        </div>
    );
};

export default SideTab;