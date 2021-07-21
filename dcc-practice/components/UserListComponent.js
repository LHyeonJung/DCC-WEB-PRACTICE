import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {initUserAction, addUserAction, removeUserAction} from '../reducers/user';

import {IoIosRefresh, IoMdRefresh} from "react-icons/io";
import {BsPencil} from "react-icons/bs";
import {GiMagnifyingGlass} from "react-icons/gi";

import Header from '../components/public/Header';
import { Grid } from "@material-ui/core";
import SideTab from '../components/SideTab';

import _ from 'lodash'; // // 모듈화, 성능 및 기타 기능을 제공하는 자바스크립트 유틸리티 라이브러리
import axios from 'axios';
import {Label, Input, Table, Menu, Icon, Divider} from 'semantic-ui-react';
// import 'semantic-ui-css/semantic.min.css';
import { List } from '@material-ui/core';

const UserListComponent = () => {
    const [status, setStatus] = useState({
        assets: [],
        filtered: [],
        filter: null,
        column: null,
        direction: null,
        sidx: 0,
        maxRows: 8,
    })

    const [searchInput, setSearchInput] = useState("");

    const dispatch = useDispatch(); // dispatch를 쉽게 사용하게 하는 hook
    const userList = useSelector(state => state.user.userList); 

    const onClickRemove = useCallback((id)=> {
        // 공용 팝업 만든 후, 정말 삭제하시겠습니까? 추가*
        dispatch(removeUserAction(id));
    }, []);

    const [page, setPage] = useState(0) // 현재 페이지
    const [rowsPerPage, setRowsPerPage] = useState(8) // 페이지 당 보여줄 열의 수
    const [totalCount, setTotalCount] = useState(0);
    var tempCnt = 0;

    // useEffect(() => {
    //     setStatus({
    //         ...status,
    //         filtered: userList,
    //         asset: userList,
    //         sidx: 0
    //     });

    //     userList.forEach(element => {
    //         tempCnt = tempCnt + 1;
    //         setTotalCount(tempCnt);
    //     });
    //     return tempCnt;
    // }, [userList, status]); //두번째 인자로 빈 배열을 넘기면 최초에만 실행되는 것, 빈값이 아니면 해당 값 업데이트 될때만 실행되는 것

    //////
    useEffect(() => {
        console.log("index init!!");
        _getUser();
    }, []); 
    
    const _getUser = useCallback(async() => {
        const res = await axios.get('http://localhost:4000/get_user_table');
        // console.log(res.data)

        dispatch(initUserAction());

        res.data.forEach(element => {

            dispatch(addUserAction(element));
        });

        setStatus({
            ...status,
            filtered: res.data,
            assets: res.data,
            sidx: 0
        });
    },[]);
    //////

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 8))
        setPage(0)
    }

    // table callbacks
    const handleSort = clickedColumn => () => {  // 함수가 정의되어 리턴된다.
        console.log("**"+clickedColumn);
        const { column, filtered, direction, sidx, maxRows} = status;
        if (column !== clickedColumn) {
            setStatus({
                ...status,
                column: clickedColumn,
                filtered: _.sortBy(filtered, [clickedColumn]), // 눌러진 컬럼이 이전과 다를 경우, 새로 정렬함
                direction: 'ascending',                         //    기본 오름차순
                sidx: 0
            });
        return;
        }

        setStatus({
            ...status,
            filtered: filtered.reverse(), // 같은 컬럼을 눌렀을 경우, 정렬을 반대로 함
            direction: direction === 'ascending' ? 'descending' : 'ascending',
            sidx: 0
        });
    }

    const onClickRefresh = useCallback((e)=> {
        e.stopPropagation();

        console.log("test1");
        _getUser();
        console.log("test2");
    }, []);

    const onSearchChange = useCallback((e) => {

        setSearchInput(e.target.value);

        const {sidx, assets, filtered, filter, column, direction, maxRows} = status;
        console.log("check: "+sidx, assets, filtered, filter, column, direction, maxRows);
        const intMaxRows = parseInt(maxRows);
        var newFiltered = [];

        assets.forEach(user => {
            if(user.id.includes(e.target.value)){
                newFiltered.push(user);
            }
           });

        if (column) {
            newFiltered =   _.sortBy(newFiltered, [column]);  // 이전에 특정 컬럼에 대한 정렬 상태면 정렬 시킨다.
            if (direction  === 'descending') { // 정렬이 내림차순일 경우 reverse 시킨다.
                newFiltered = newFiltered.reverse();
            }
        }

        setStatus({
            ...status,
            filtered: newFiltered,
            filter: e.target.value,
            sidx: 0
        });
                        

    });


    // const userItems = userList.slice(page * rowsPerPage, (page+1) * rowsPerPage).map(
    //     user => {
    //         const {id, pass, isSuperUser, isSecurityAgent, role, isOTP, isignOTPShared, info} = user;
    //         console.log("id: "+id);
    //         return(
    //             <Table.Row key={id}>
    //                 <Table.Cell>{id}</Table.Cell>
    //                 <Table.Cell>{isSuperUser=="true" ? "관리자" : "일반 사용자"}</Table.Cell>
    //                 <Table.Cell>{isSecurityAgent=="true" ? "보안관리자" : "-"}</Table.Cell>
    //                 <Table.Cell>{role}</Table.Cell>
    //                 <Table.Cell>{isOTP=="true" ? "사용" : "사용안함" }</Table.Cell>
    //                 <Table.Cell><BsPencil  onClick={(e) => onClickModify(e, {id})}  style={{cursor:"pointer"}}/></Table.Cell>
    //                 <Table.Cell><GiMagnifyingGlass style={{cursor:"pointer"}} onClick={(e) => onClickDetail(e, {id})}/></Table.Cell>
    //             </Table.Row>
    //         )
    //     }
    // )

    const userItems = status.filtered.slice(page * rowsPerPage, (page+1) * rowsPerPage).map(
        user => {
            const {id, pass, isSuperUser, isSecurityAgent, role, isOTP, isignOTPShared, info} = user;
            return(
                <Table.Row key={id}>
                    <Table.Cell>{id}</Table.Cell>
                    <Table.Cell>{isSuperUser=="true" ? "관리자" : "일반 사용자"}</Table.Cell>
                    <Table.Cell>{isSecurityAgent=="true" ? "보안관리자" : "-"}</Table.Cell>
                    <Table.Cell>{role}</Table.Cell>
                    <Table.Cell>{isOTP=="true" ? "사용" : "사용안함" }</Table.Cell>
                    <Table.Cell><BsPencil  onClick={(e) => onClickModify(e, {id})}  style={{cursor:"pointer"}}/></Table.Cell>
                    <Table.Cell><GiMagnifyingGlass style={{cursor:"pointer"}} onClick={(e) => onClickDetail(e, {id})}/></Table.Cell>
                </Table.Row>
            )
        }
    )

    return (
        <div>
            <a className="componentTitle">사용자 조회</a>
            <a className="componentDesc">DCC에 등록된 사용자를 조회합니다.</a>
            {/* <button onclick={(e)=> onClickRefresh(e)}>
                 <IoMdRefresh style={{ marginTop:"20px", marginRight:"40px", display: "inline-block", float:"right", cursor:"pointer"}} />
            </button> 이벤트를 안탐 */}
            <div onclick={onClickRefresh} style={{ marginTop:"20px", marginRight:"20px", display: "inline-block", float:"right", cursor:"pointer"}}>
                 <IoMdRefresh />
            </div>

            <Input icon='search' actionPosition='right'  style={{marginLeft: "20px", marginTop:"10px"}} placeholder='검색 대상 ID 키워드 입력' onChange={onSearchChange}/>
            <Label as='a' />

            <Table className="tableHead" sortable celled fixed unstackable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell sorted={status.column==='id' ? status.direction : null} onClick={handleSort('id')} style={{cursor:"pointer"}} >ID</Table.HeaderCell>
                        <Table.HeaderCell sorted={status.column==='isSuperUser' ? status.direction : null} onClick={handleSort('isSuperUser')} style={{cursor:"pointer"}}>관리자 여부</Table.HeaderCell>
                        <Table.HeaderCell sorted={status.column==='isSecurityAgent' ? status.direction : null} onClick={handleSort('isSecurityAgent')} style={{cursor:"pointer"}}>보안관리자 여부</Table.HeaderCell>
                        <Table.HeaderCell sorted={status.column==='role' ? status.direction : null} onClick={handleSort('role')} style={{cursor:"pointer"}}>권한</Table.HeaderCell>
                        <Table.HeaderCell sorted={status.column==='isOTP' ? status.direction : null} onClick={handleSort('isOTP')} style={{cursor:"pointer"}}>OTP 사용여부</Table.HeaderCell>
                        <Table.HeaderCell >수정 </Table.HeaderCell>
                        <Table.HeaderCell >상세보기 </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body className="tableBody" styles={{'max-height':'85vh'}}>
                    {/* { _.map( status.filtered.slice(status.sidx,status.maxRows),({id,isSuperUser,isSecurityAgent,role,isOTP})  =>
                            <Table.Row key={id}>
                                <Table.Cell>{id}</Table.Cell>
                                <Table.Cell>{isSuperUser}</Table.Cell>
                                <Table.Cell>{isSecurityAgent}</Table.Cell>
                                <Table.Cell>{role}</Table.Cell>
                                <Table.Cell>{isOTP}</Table.Cell>
                            </Table.Row>
                        )} */}
                        {userItems}
                </Table.Body>
            </Table>
            {/* <Pagination floated='right' defaultActivePage={curPage+1} totalPages={totalPage} onPageChange={this.handlePage} /> */}

        </div>
    );
};

export default UserListComponent;