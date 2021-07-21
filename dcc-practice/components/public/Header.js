import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { Grid, Box, Button, Typography } from "@material-ui/core";
import logo from '../../images/Light/Light_logo_m.png';
import SideTab from '../SideTab';
import {AiOutlineDown, AiOutlineBell} from "react-icons/ai";
import CreateMenu from './Menu.js';
import ReactTooltip from 'react-tooltip';
import axios from 'axios';

// const linkStyle = {
//     marginRight: '1rem'
// }
// const Header = () => {
    
function Header () {
    const [pushList, SetPushList] = useState(
        [
            {
                id: "1",
                kind: "암호화",
                contents: "BA-SCP 암호화 작업이 등록되었습니다."
            },
            {
                id: "2",
                kind: "암호화",
                contents: "DP 암호화 작업이 PM16:00에 예약되어 있습니다."
            },
            {
                id: "3",
                kind: "복호화",
                contents: "DP 복호화 작업이 AM10:00에 완료되었습니다."
            },
        ]
    )

    const [pushCount, setPushCount] = useState(pushList.length);

    const handleRemoveAlarm = useCallback((id) =>
    {
        console.log("target Id: "+ id);
        SetPushList(pushList.filter((pushList) => pushList.id !== id));
        let nextCount = pushCount -1;
        setPushCount(nextCount);

        let tempId = 1;
        (pushList).forEach(element => {
            console.log("new setting id: "+tempId);
            element.id = tempId;
            tempId = tempId+1;
        });
    },
    [pushList]);

    //////
    // const dispatch = useDispatch(); // dispatch를 쉽게 사용하게 하는 hook
    const userList = useSelector(state => state.user.userList); // store의 state.saList를 불러오는 hook 
    // useEffect(() => {
    //     _dbGetTest();
    // }, []); 
    
    // const _dbGetTest = async() => {
    //     //const res = await axios.get('http://localhost:4000/get_test_table');
    //     const res = await axios.get('http://localhost:4000/get_user_table');
    //     console.log(res.data)
    //     res.data.forEach(element => {
    //         //setsqlData(id=element.id, pass=element.pass);
    //     });
    // }

    //////

    console.log("Header 렌더링");
    return (
        <div>
            <Grid container spacing={1}> 
                <Grid item xs={12} sm={4} className="Grid_Logo"> 
                    <img src={logo} alt="logo" style={{display:"inline", verticalAlign:"middle"}}/>
                    <h2 style={{display: "inline", margin:"10px"}}>D'Amo Control Center</h2>
                </Grid>
                <Grid item xs={12} sm={5} className="Grid_Menu">
                    <div className="menu-box">
                        <ul className = "menu">
                            <li><a href="/dashboard">대시보드</a></li>

                            {/* <li><a>서버 관리</a> */}
                            <li><a>서버 관리 <AiOutlineDown style={{paddingTop: "11px", fontSize:"21px"}}/></a>
                            {/* <li><a>서버 관리 <span class="icon-arrow-down">&#xE001;</span></a> */}
                                <ul className="sub">
                                    <li><a href="/assetManagement">서버 등록</a></li>
                                    <li><a href="/assetManagement">서버 목록 조회</a></li>
                                    <li><a href="/assetManagement">그룹 생성</a></li>
                                    <li><a href="/assetManagement">그룹 목록 조회</a></li>
                                </ul>
                            </li>

                            {/* <li><a>암호화</a> */}
                            <li><a>암호화  <AiOutlineDown style={{paddingTop: "11px", fontSize:"21px"}}/></a>
                                <ul className="sub">
                                    <li><a href="/encryption">암호화 정책 생성</a></li>
                                    <li><a href="/encryption">암호화 정책 조회</a></li>
                                </ul>
                            </li>

                            {/* <li><a>로그</a> */}
                            <li><a>로그 <AiOutlineDown style={{paddingTop: "11px", fontSize:"21px"}}/></a>
                                <ul className="sub">
                                    <li><a href="/log">로그 조회</a></li>
                                </ul>
                            </li>

                            {/* <li><a>설정</a> */}
                            <li><a href="/setting">설정 <AiOutlineDown style={{paddingTop: "11px", fontSize:"21px"}}/></a>
                                <ul className="sub">
                                    <li><a href="/setting">설정 템플릿 생성</a></li>
                                    <li><a href="/setting">설정 템플릿 조회</a></li>
                                    <li><a href="/setting">DCC 기본 설정</a></li>
                                    <li><a href="/setting">백업 설정</a></li>
                                    <li><a href="/setting">연동 설정</a></li>
                                    <li><a href="/enrollUser">사용자 등록</a></li>
                                    <li><a href="/userList">사용자 조회</a></li>
                                    <li><a href="/setting">유지보수 코드 관리</a></li>
                                    <li><a href="/setting">UI 설정</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    {/* <Button color="default" size="small">
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
                    </Button> */}
                </Grid>
                <Grid item xs={12} sm={1} className="Grid_Default">
                    <div>
                        <div className="redCircle">{pushCount}</div>
                        <AiOutlineBell data-tip data-for="tooltip" className="push-bell"/>
                        <ReactTooltip id="tooltip" place="bottom" effect="solid" clickable="true" textColor="black" backgroundColor="white" arrowColor="white">
                            <div style={{width:"250px", borderBottom:"1px solid grey"}}>알림</div>
                            <div style={{width:"250px", margin:'0.5%'}}>
                                {pushCount>0 && pushList.map((pushObj) =>
                                    <div style={{marginTop: '1%', marginLeft: '2%'}} key={pushObj}>
                                        <div >
                                            <h3 style={{color: "Navy"}}>{pushObj.kind}</h3>
                                            <h4 style={{display:'inline'}}>{pushObj.contents}</h4>
                                            <div className="RemoveButton" onClick={() => handleRemoveAlarm(pushObj.id)}>X</div>
                                        </div>
                                     </div>
                                 )}
                            </div>
                        </ReactTooltip>
                    </div>
                </Grid>

                {/* https://ddeck.tistory.com/30 */}
                <Grid item xs={12} sm={2} className="Grid_User">  
                    <div>
                        <h4>{}</h4>
                        {/* <h2>user정보!</h2>
                        <h3>아이디 입력</h3>
                        <input name="text" onChange={handlChangeText}></input>
                        <button onClick={onclickSaveDb}>전송</button> */}
                    </div>
                </Grid>
                {/* <Grid item xs={12} sm={4} >
                    <SideTab/>
                </Grid> */}
            </Grid>
        </div>
    );
};

export default Header;