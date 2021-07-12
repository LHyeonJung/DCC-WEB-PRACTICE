import React, {useEffect, useState, useCallback} from 'react';
import {Record, List, Map} from 'immutable';
import { useDispatch, useSelector } from 'react-redux';
import {removeSaInfoAction} from '../reducers/sa';
import styled from 'styled-components';

import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableFooter,
    TablePagination,
} from '@material-ui/core'

const AssetManagement = ({assetList, onChange, password})=>{
    // 이것때문에 build에 실패하고 있었음 (들어오는 targetId값이 없음)
    // useEffect(()=>
    // {
    //     console.log('targetId: ', targetId);
    // }, [targetId]);

    console.log("AssetManagement 렌더링");

    // 페이징 구현을 위한 상태관리 
    //========
    const [page, setPage] = useState(0) // 현재 페이지
    const [rowsPerPage, setRowsPerPage] = useState(8) // 페이지 당 보여줄 열의 수
    const [totalCount, setTotalCount] = useState(0);
    var tempCnt = 0;

    useEffect(() => {
        assetList.forEach(element => {
            tempCnt = tempCnt + 1;
            setTotalCount(tempCnt);
        });
        return tempCnt;
    }, [assetList]); //두번째 인자로 빈 배열을 넘기면 최초에만 실행되는 것, 빈값이 아니면 해당 값 업데이트 될때만 실행되는 것

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        console.log("??"+ event.target.value);
        setRowsPerPage(parseInt(event.target.value, 8))
        setPage(0)
    }
    //========

    // let [targetId, setTargetId] = useState('');
    const dispatch = useDispatch(); // dispatch를 쉽게 사용하게 하는 hook

    const onClickRemove = useCallback((e, id)=> {
        // 클릭 시, 비밀번호 입력 팝업 출력되도록 해야함
        e.stopPropagation();
        
        console.log("targetId: "+ id);
        console.log("userPw: "+ password);

        if(IsValidKey(password)){
            dispatch(removeSaInfoAction(id));
        }
        else{
            alert("사용자 비밀번호가 일치하지 않습니다.");
        }
    }, []);

    function IsValidKey(pwd){
        // 키 검증 로직
    
        // 임시로직
        if(pwd === 'Qaeldkah9./') 
            return true;
        else 
            return false;
      }

    // const assetItems = assetList.map(
    //     asset => {
    //         const {saId, saIp, saPort, saOs, saGroup} = asset;
    //         const tempInfo = asset;
    //         return(
    //             <li>
    //                 <h5 style={{display:'inline'}}>
    //                     {saId} | {saIp} | {saPort} | {saOs} | {saGroup} 

    //                     {/* <div
    //                         style={{display:'inline'}} 
    //                         onClick={(e)=>{
    //                         e.stopPropagation();
    //                         setTargetId({saId});
    //                         onRemove={onClickRemove}
    //                     }}> &times; </div> */}

    //                     <div className="RemoveButton" onClick={(e) => onClickRemove(e, {saId})}>X</div>
    //                 </h5>
    //             </li>
    //         )

    //     }
    // )


    // 테이블 만들기 예제 (https://ndb796.tistory.com/216)
    // 테이블 페이징 예제 (https://www.daleseo.com/material-ui-tables/)
    const assetItems = assetList.slice(page * rowsPerPage, (page+1) * rowsPerPage).map(
        asset => {
            const {saId, saIp, saPort, saOs, saGroup} = asset;
            return(
                <TableRow>
                    <TableCell>{saId}</TableCell>
                    <TableCell>{saIp}</TableCell>
                    <TableCell>{saPort}</TableCell>
                    <TableCell>{saOs}</TableCell>
                    <TableCell>{saGroup}</TableCell>
                    <TableCell><button className="RemoveButton" onClick={(e) => onClickRemove(e, {saId})}>delete</button></TableCell>
                </TableRow>
            )

        }
    )

    const TableContainer = styled.div` max-height : 600px; height : 100%; overflow-y:auto; `; // https://r-0o0-j.tistory.com/155
    
    return (
        <div>
            {/*
            <ul>
                { assetItems }
            </ul> */}

            <h4>서버 목록 조회 </h4>
            <TableContainer>
                <Table stickyHeader>
                    <TableHead className="tableHead">
                        <TableRow>
                            <TableCell>아이디</TableCell>
                            <TableCell>IP</TableCell>
                            <TableCell>PORT</TableCell>
                            <TableCell>OS</TableCell>
                            <TableCell>GROUP</TableCell>
                            <TableCell>삭제</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className="tableBody">
                        { assetItems }
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                count={totalCount}
                                page={page}
                                rowsPerPage={rowsPerPage}
                                rowsPerPageOptions = {[]}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>

        </div>
    );
};

const saInfoRecord = Record({
    saId: '',
    saIp: '',
    saPort: '',
    saOs: '',
    saGroup: ''
})

const tempInfo = saInfoRecord({saId:"SA3", saIp:"10.0.65.34", saPort:"34579", saOs:"Window10", saGroup:"Group3"});

/*
React.memo
: 컴포넌트의 props 가 바뀌지 않았다면, 리렌더링을 방지하여 컴포넌트의 리렌더링 성능 최적화를 해줄 수 있는 함수
 */
export default React.memo(AssetManagement);

/*
[클래스형 컴포넌트 - Life Cycle 활용]

const AssetItem = ({saId, onChange, onRemove}) => {
    // <li onClick={()=> onChange(saId)} onRemove={()=>onRemove(saId)}>
    //     {saId}
    // </li>
}

class AssetManagement extends Component{ 

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.assetList !== nextProps.assetList; // 업데이트 조건을 return (여기선 assetList가 바뀔때 리렌더링 필요)
    }

    render(){
        const {assetList, onChange, onRemove} = this.props;
        console.log("assetList", assetList);

        const assetItems = assetList.map(
            asset => {
                console.log("asset: ", asset);
                const {saId, saIp, saPort, saOs, saGroup, key} = asset;
                console.log("saId:", {saId});
                console.log("saIp:", {saIp});
                console.log("saPort:", {saPort});
                console.log("saOs:", {saOs});
                console.log("saGroup:", {saGroup});
    
    
                const tempInfo = asset;
                console.log("tempInfo: ", tempInfo);
    
                return(
                    <li>
                        <h5>
                            {saId} {saIp} {saPort} {saOs} {saGroup}
                        </h5>
                    </li>
                    // <AssetItem
                    //     saId = {saId}
                    //     saIp = {saIp}
                    //     saPort = {saPort}
                    //     saOs = {saOs}
                    //     saGroup = {saGroup}
                    //     key={saId}
                    // />
                )
    
            }
        )

        const saInfoRecord = Record({
            saId: '',
            saIp: '',
            saPort: '',
            saOs: '',
            saGroup: ''
        })
        
        const tempInfo = saInfoRecord({saId:"SA3", saIp:"10.0.65.34", saPort:"34579", saOs:"Window10", saGroup:"Group3"});

        return (
            <div>
                <h3> L I S T </h3>
                <ul>
                    { assetItems }
                </ul>
            </div>
        );
    }
};

// AssetManagement.defaultProps = {
//     assetList: List([
//         saInfoRecord({saId:'SA1', saIp:'127.0.0.1', saPort:'34579', saOs:'Window10', saGroup:'GROUP1' }),
//         saInfoRecord({saId:'SA2', saIp:'10.0.65.20', saPort:'34579', saOs:'Linux', saGroup:'GROUP2' })
//     ])
// }

// AssetManagement.defaultProps = {
//     assetList: List([
//         Map({
//           tempInfo
//         })
//       ])
// }

// AssetManagement.defaultProps = {
//     assetList: List([
//         tempInfo
//       ])
// }

export default AssetManagement;
*/