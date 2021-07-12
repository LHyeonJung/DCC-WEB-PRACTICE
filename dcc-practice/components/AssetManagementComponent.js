import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {changeSaInfoAction, addSaInfoAction, removeSaInfoAction} from '../reducers/sa';
import {Record, List} from 'immutable';
import AssetManagement from './AssetManagement';

const AssetManagementComponent = () => {

    console.log("AssetManagementComponent 렌더링");

    let [inputSaInfo, setInputSaInfo] = useState({
        saId: '',
        saIp: '',
        saPort: '',
        saOs: '',
        saGroup: ''
    });
    let [inputPw, setInputPw] = useState('Qaeldkah9./');

    function onChangeInput(e){
        const { name, value } = e.target;
        console.log("name: "+ name);
        console.log("value: "+ value);
        setInputSaInfo({
            ...inputSaInfo,
            [name]: value
        });

        console.log("inputInfo: "+ inputSaInfo.saId);
    }

    const dispatch = useDispatch(); // dispatch를 쉽게 사용하게 하는 hook
    const saList = useSelector(state => state.sa.saList); // store의 state.saList를 불러오는 hook 

    // useCallback은 최적화를 위한 hook 
    const onClickChange = useCallback(()=> {
        dispatch(changeSaInfoAction(inputSaInfo));
    }, []);

    const onClickAdd = useCallback((input)=> {
        console.log("**ID: "+ input.saId);
        dispatch(addSaInfoAction(input));
    }, []);

    return (
        <div>
            Asset Management Component
            <a style={{display:"block"}}>SA 아이디: </a>
            <input style={{display:"block"}} name="saId" value={inputSaInfo.saId} onChange={onChangeInput}/>

            <a>SA IP: </a>
            {/* <input style={{display:"block"}} value={inputIp} onChange={e=>setinputIp(e.target.value)}/> */}
            <input style={{display:"block"}} name="saIp" value={inputSaInfo.saIp} onChange={onChangeInput}/>

            <a>SA Port: </a>
            {/* <input style={{display:"block"}} value={inputPort} onChange={e=>setinputPort(e.target.value)}/> */}
            <input style={{display:"block"}} name="saPort" value={inputSaInfo.saPort} onChange={onChangeInput}/>

            <a>SA OS: </a>
            {/* <input style={{display:"block"}} value={inputOs} onChange={e=>setinputOs(e.target.value)}/> */}
            <input style={{display:"block"}} name="saOs" value={inputSaInfo.saOs} onChange={onChangeInput}/>

            <a>SA Group: </a>
            {/* <input style={{display:"block"}} value={inputGroup} onChange={e=>setinputGroup(e.target.value)}/> */}
            <input style={{display:"block"}} name="saGroup" value={inputSaInfo.saGroup} onChange={onChangeInput}/>

            {/* <button onClick={onClickChange}> 수정 </button> ==> 각 리스트 항목마다 존재해야 함 */}
            <button onClick={() => onClickAdd(inputSaInfo)}> 추가 </button>

            {/* <a style={{display:"block"}}>삭제 시 입력 - 비밀번호: </a>
            <input style={{display:"block"}} value={e=>setInputPw(e.target.value)}></input>
            <button onClick={onClickRemove}> 삭제 </button>  ==> 각 리스트 항목마다 존재해야 함 */}

            <AssetManagement assetList={saList} onChange={onClickChange} password={inputPw} />
        </div>
    );
};

export default AssetManagementComponent;