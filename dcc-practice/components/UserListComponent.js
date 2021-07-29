import React, { useEffect, useCallback, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {initUserAction, addUserAction, removeUserAction} from '../reducers/user';

import {IoIosRefresh, IoMdRefresh} from "react-icons/io";
import {BsFillChatSquareDotsFill, BsPencil} from "react-icons/bs";
import {GiMagnifyingGlass} from "react-icons/gi";

import Header from '../components/public/Header';
import { Grid } from "@material-ui/core";
import SideTab from '../components/SideTab';

import _ from 'lodash'; // // 모듈화, 성능 및 기타 기능을 제공하는 자바스크립트 유틸리티 라이브러리
import axios from 'axios';
import {Label, Input, Table, Menu, Icon, Divider, StatisticValue} from 'semantic-ui-react';
// import 'semantic-ui-css/semantic.min.css';
import { List } from '@material-ui/core';

const UserListComponent = () => {
   
    // // [컴포넌트 최적화]  컴포넌트가 리렌더링 할지말지 정해줌 ** 
    // shouldComponentUpdate(nextProps, nextState) {
    //     return this.props.todos !== nextProps.todos; // 업데이트 조건을 return (여기선 todo 리스트가 바뀔때 리렌더링 필요)
    // }

    const resettingRef = useRef(false); // 데이터를 동기식으로 사용하기 위함 (useState자체는 비동기식으로 운영되기 때문에 바로 업데이트 되지 않음 - 함수형 컴포넌트에서는 일반적으로 동기식 데이터를 useState로 관리하지 않음)

    const dispatch = useDispatch(); // dispatch를 쉽게 사용하게 하는 hook
    const userList = useSelector(state => state.user.userList); 

    const [status, setStatus] = useState({
        assets: [],
        filtered: [],
        filter: null,
        column: null,
        direction: null,
        sidx: 0,
        maxRows: 20,
    })

    const [isAllChecked, setIsAllChecked] = useState(false);
    const [isCheckedItems, setIsChekedItems] = useState([]);//([{targetId: '', isChecked: false}]);

    const [page, setPage] = useState(0) // 현재 페이지
    const [rowsPerPage, setRowsPerPage] = useState(20) // 페이지 당 보여줄 열의 수
    const [totalCount, setTotalCount] = useState(0);

    const [searchKeword, setSearchKeword] = useState('');
    var tempCnt = 0;

    //////
    useEffect(() => {
        console.log("index init!!");
        _getUser();
    }, []);

    useEffect(() => {
        console.log("reduxUserList -- useEffect");
        if (resettingRef.current) {
            console.log("get db");
            resettingRef.current = false;
            _getUser();
        }
    }, [resettingRef.current]);

    // useEffect(() => {
    //     console.log("isCheckedItems 변경");
    //     // isCheckedItems.forEach(element => {
    //     //     console.log("* "+ element.targetId + "/"+ element.isChecked);
    //     // });

    //     var userListTemp = [...status.assets];
    //     // status.assets.info 데이터 예시:  {"user_info": {"list": ["{\"id\":\"USER3\",\"pass\":\"qhdks./\",\"isSuperUser\":\"false\",\"userName\":\"hyeonjung4\",\"isSecurityAgent\":\"false\",\"role\":null,\"isOTP\":\"false\",\"isignOTPShared\":\"false\",\"Explanation\":\"~~\",\"mail\":\"\",\"phone\":\"1234\",\"department\":\"\",\"rank\":\"\",\"isDuplicateLogin\":\"true\",\"serverGroupAccessibility\":\"\",\"menuAccessibility\":\"\",\"info\":\"\"}"]}}
    //     userListTemp.forEach(element => {
    //         var temp = JSON.parse(element.info);
    //         for(var key in temp){
    //             var user_info = temp[key];
    //             for(var info in user_info){
    //                 console.log("key: "+ info + "/ "+ user_info[info]);
    //                 element.info = JSON.parse(user_info[info]);
    //             }
    //         }
    //         // element.info = JSON.parse(element.info);
    //     });

    //     setStatus({
    //         ...status,
    //         filtered: userListTemp,
    //         assets: userListTemp,
    //     });
        
    //     //JSON.parse(jsonData);
    // }, [status.assets]);
    
    const _getUser = useCallback(async() => {
        const res = await axios.get('http://localhost:4000/get_user_table');
        // console.log(res.data)

        dispatch(initUserAction());

        res.data.forEach(element => {
            dispatch(addUserAction(element));
        });

        console.log("1111111111");
        setIsChekedItems([]);
        res.data.forEach(element => {
            setIsChekedItems(isCheckedItems => [...isCheckedItems, {targetId: element.id, isChecked:false}]);
            // setIsChekedItems(isCheckedItems.concat({targetId:element.id, ischecked:false}));
        });

        var userListTemp = [...res.data];
        // status.assets.info 데이터 예시:  {"user_info": {"list": ["{\"id\":\"USER3\",\"pass\":\"qhdks./\",\"isSuperUser\":\"false\",\"userName\":\"hyeonjung4\",\"isSecurityAgent\":\"false\",\"role\":null,\"isOTP\":\"false\",\"isignOTPShared\":\"false\",\"Explanation\":\"~~\",\"mail\":\"\",\"phone\":\"1234\",\"department\":\"\",\"rank\":\"\",\"isDuplicateLogin\":\"true\",\"serverGroupAccessibility\":\"\",\"menuAccessibility\":\"\",\"info\":\"\"}"]}}
        userListTemp.forEach(element => {
            var temp = JSON.parse(element.info);
            for(var key in temp){
                var user_info = temp[key];
                for(var info in user_info){
                    // console.log("key: "+ info + "/ "+ user_info[info]);
                    element.info = JSON.parse(user_info[info]);
                }
            }
            // element.info = JSON.parse(element.info);
        });

        setStatus({
            ...status,
            filtered: userListTemp,
            assets: userListTemp,
            sidx: 0,
        });

    },[isCheckedItems, status]);
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

    const onClickRefresh = (e)=> {
        e.stopPropagation();

        console.log("_getUser");
        _getUser();
        setSearchKeword('');
    };

    const onSearchChange = useCallback((e) => {
        setSearchKeword(e.target.value);
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


    const onClickAllChecked = useCallback((isChecked)=> {
        // e.stopPropagation();

        console.log("allChecked --- "+ isChecked);
        if(!isChecked){
            console.log("전체 선택");
            setIsAllChecked(true);

            console.log("222222222");
            setIsChekedItems([]);
            status.filtered.forEach(element => {
                setIsChekedItems(isCheckedItems => [...isCheckedItems, {targetId: element.id, isChecked:true}]);
            });
        }
        else{
            console.log("전체 선택 해제");
            setIsAllChecked(false);
            console.log("333333333");
            setIsChekedItems([]);
            status.filtered.forEach(element => {
                setIsChekedItems(isCheckedItems => [...isCheckedItems, {targetId: element.id, isChecked:false}]);
            });
        }
        console.log("전체: "+ isCheckedItems);
    },[isCheckedItems, status]);

    const onClickChecked = useCallback((e, isCheckedList, id)=> {
        e.stopPropagation();

        console.log("이벤트 대상 id: "+ id);
        const checkedItemIndex = isCheckedList.findIndex(x => x.targetId===id);
        var ischecked = false;
        if(checkedItemIndex<0){ // 항목 없음 (이런경우는 없어야 함 - 예외처리)
            console.log("배열에 해당 id 없음" + checkedItemIndex);
        }
        else{
            console.log("배열에 해당 id 있음");

            ischecked = isCheckedList[checkedItemIndex].isChecked;
            console.log("체크여부: "+ ischecked);

            // 배열중에 해당 id를 가진 항목만 isChecked를 반대로 수정
            console.log("5555555555");
            setIsChekedItems(
                isCheckedList.map(item =>
                  item.targetId === id ? { targetId:item.targetId, isChecked: !ischecked} : item
                )
              );
  
        }
    },[isCheckedItems]);

    const DeleteUser =useCallback((e)=> { 

        var temp = isCheckedItems.filter((x) => x.isChecked === true)
        console.log("제거 대상 개수: "+ temp.length);
        if(temp.length>0){
            temp.forEach(async(element) => {
                if(element.isChecked == true){
                    console.log("제거 targetID--: "+ element.targetId);
                    const res = await axios('http://localhost:4000/delete_user', {
                    method: 'POST',
                    data: {'data': element.targetId},
                    headers: new Headers()
                    })
                    dispatch(removeUserAction(element.targetId));
                }
            });
            // _getUser(); // 데이터를 세팅한뒤 값이 바로 반영 안됨

            // (temp).forEach(element => {
            //     setIsChekedItems(isCheckedItems.filter(item => item.targetId !== element.targetId));
            // });
            
            resettingRef.current = true; 
         }

         else{
             alert("제거 대상이 없습니다.");
         }
    }, [isCheckedItems, status]);

    const userItems = status.filtered.slice(page * rowsPerPage, (page+1) * rowsPerPage).map(
        user => {
            const {id, pass, isSuperUser, isSecurityAgent, role, isOTP, isignOTPShared, info} = user;
            const checkedItemIndex = isCheckedItems.findIndex(x => x.targetId===id);
            var ischecked = false;
            if(checkedItemIndex<0){
                ischecked = false;
            }
            else{
                ischecked = isCheckedItems[checkedItemIndex].isChecked;
            }

            return(
                <Table.Row key={id}>
                    <Table.Cell><input type="checkbox" checked={ischecked} onChange={e=>onClickChecked(e, isCheckedItems, id)}></input></Table.Cell>
                    <Table.Cell>{id}</Table.Cell>
                    <Table.Cell>{isSuperUser==="true" ? "관리자" : "일반 사용자"}</Table.Cell>
                    <Table.Cell>{isSecurityAgent==="true" ? "보안관리자" : "-"}</Table.Cell>
                    <Table.Cell>{role}</Table.Cell>
                    <Table.Cell>{isOTP=="true" ? "사용" : "사용안함" }</Table.Cell>
                    <Table.Cell>{info.isDuplicateLogin==="true"? "허용": "금지"}</Table.Cell>
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
            <button onClick={(e) => onClickRefresh(e)} style={{ marginTop:"20px", marginRight:"20px", display: "inline-block", float:"right", cursor:"pointer"}}>
                 <IoMdRefresh />
            </button>

            <Input icon='search' actionPosition='right'  style={{marginLeft: "20px", marginTop:"10px"}} placeholder='검색 대상 ID 키워드 입력' value={searchKeword} onChange={onSearchChange}/>
            <Label as='a' />

            <button style={{width:"50px", display:"block", marginRight:"20px", float:"right"}} onClick={(e) => DeleteUser(e)}>삭제</button>

            <Table className="tableHead" sortable celled fixed unstackable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell ><input name="headerCheckbox" type="checkbox" checked={isAllChecked} onChange={(e)=> onClickAllChecked(isAllChecked)}></input> </Table.HeaderCell>
                        <Table.HeaderCell sorted={status.column==='id' ? status.direction : null} onClick={handleSort('id')} style={{cursor:"pointer"}} >ID</Table.HeaderCell>
                        <Table.HeaderCell sorted={status.column==='isSuperUser' ? status.direction : null} onClick={handleSort('isSuperUser')} style={{cursor:"pointer"}}>관리자 여부</Table.HeaderCell>
                        <Table.HeaderCell sorted={status.column==='isSecurityAgent' ? status.direction : null} onClick={handleSort('isSecurityAgent')} style={{cursor:"pointer"}}>보안관리자 여부</Table.HeaderCell>
                        <Table.HeaderCell sorted={status.column==='role' ? status.direction : null} onClick={handleSort('role')} style={{cursor:"pointer"}}>권한</Table.HeaderCell>
                        <Table.HeaderCell sorted={status.column==='isOTP' ? status.direction : null} onClick={handleSort('isOTP')} style={{cursor:"pointer"}}>OTP 사용여부</Table.HeaderCell>
                        <Table.HeaderCell >중복 로그인 허용 여부 </Table.HeaderCell>
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
}
// , (prevProps, nextProps) => {
//     //return nextProps.status.assets === prevProps.status.assets;
// };

// export default UserListComponent;//React.memo(UserListComponent, (prevProps, nextProps) => this.prevProps.status.assets == nextProps.status.assets);//UserListComponent;//React.memo(UserListComponent, areEqual);
export default React.memo(
    UserListComponent,
    (prevProps, nextProps) => prevProps.status.assets === nextProps.status.assets // false 반환 시, 리렌더링
);
// export default UserListComponent;