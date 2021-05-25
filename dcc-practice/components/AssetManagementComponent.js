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

    let [saArray, setSaArray] = useState([{
        saId: '',
        saIp: '',
        saPort: '',
        saOs: '',
        saGroup: ''
    },]);

    let [inputId, setInputId] = useState("");
    let [inputIp, setInputIp] = useState("");
    let [inputPort, setInputPort] = useState("");
    let [inputOs, setInputOs] = useState("");
    let [inputGroup, setInputGroup] = useState("");
    let [inputPw, setInputPw] = useState('Qaeldkah9./');

    const saInfoRecord = Record({
        saId: '',
        saIp: '',
        saPort: '',
        saOs: '',
        saGroup: ''
    })

    function handleIdChange(e)
    {
        setInputId(e.target.value);
        inputSaInfo.saId = inputId;
        setInputSaInfo(inputSaInfo);
        console.log("input: ", inputSaInfo.saId);

        /*
        // * inputSaInfo의 saId 업데이트 하는 방법
        inputSaInfo.saId = inputId;
        setInputSaInfo(inputSaInfo);

        // * saArray의 특정 정보 업데이트 하는 방법
        console.log(saArray);
        let index = saArray.findIndex(x=>x.saId == "SA1");
        var temp = [...saArray];
        temp[index].saGroup = e.target.value;
        setSaArray(temp);
        console.log(saArray);
        */
    }

    function handleIpChange(e)
    {
        setInputIp(e.target.value);
        inputSaInfo.saIp = inputIp;
        setInputSaInfo(inputSaInfo);
    }

    function handlePortChange(e)
    {
        setInputPort(e.target.value);
        inputSaInfo.saPort = inputPort;
        setInputSaInfo(inputSaInfo);
    }

    function handleOsChange(e)
    {
        setInputOs(e.target.value);
        inputSaInfo.saOs = inputOs;
        setInputSaInfo(inputSaInfo);
    }

    function handleGroupChange(e)
    {
        setInputGroup(e.target.value);
        inputSaInfo.saGroup = inputGroup;
        setInputSaInfo(inputSaInfo);
    }

    const dispatch = useDispatch(); // dispatch를 쉽게 사용하게 하는 hook
    const saList = useSelector(state => state.sa.saList); // store의 state.saList를 불러오는 hook 
    // console.log("111", saList);

    // useCallback은 최적화를 위한 hook 
    const onClickChange = useCallback(()=> {
        dispatch(changeSaInfoAction(inputSaInfo));
    }, []);

    const onClickAdd = useCallback(()=> {
        dispatch(addSaInfoAction(inputSaInfo));
    }, []);

    const onClickRemove = useCallback(()=> {
        dispatch(removeSaInfoAction(inputId, inputPw));
    }, []);

    return (
        <div>
            Asset Management Component
            <a style={{display:"block"}}>SA 아이디: </a>
            <input style={{display:"block"}} value={inputId} onChange={handleIdChange}/>

            <a>SA IP: </a>
            {/* <input style={{display:"block"}} value={inputIp} onChange={e=>setinputIp(e.target.value)}/> */}
            <input style={{display:"block"}} value={inputIp} onChange={handleIpChange}/>

            <a>SA Port: </a>
            {/* <input style={{display:"block"}} value={inputPort} onChange={e=>setinputPort(e.target.value)}/> */}
            <input style={{display:"block"}} value={inputPort} onChange={handlePortChange}/>

            <a>SA OS: </a>
            {/* <input style={{display:"block"}} value={inputOs} onChange={e=>setinputOs(e.target.value)}/> */}
            <input style={{display:"block"}} value={inputOs} onChange={handleOsChange}/>

            <a>SA Group: </a>
            {/* <input style={{display:"block"}} value={inputGroup} onChange={e=>setinputGroup(e.target.value)}/> */}
            <input style={{display:"block"}} value={inputGroup} onChange={handleGroupChange}/>

            {/* <button onClick={onClickChange}> 수정 </button> ==> 각 리스트 항목마다 존재해야 함 */}
            <button onClick={onClickAdd}> 추가 </button>

            {/* <a style={{display:"block"}}>삭제 시 입력 - 비밀번호: </a>
            <input style={{display:"block"}} value={e=>setInputPw(e.target.value)}></input>
            <button onClick={onClickRemove}> 삭제 </button>  ==> 각 리스트 항목마다 존재해야 함 */}

            <AssetManagement key={inputId} assetList={saList} onChange={onClickChange} onRemove={onClickRemove} password={inputPw} />
        </div>
    );
};

export default AssetManagementComponent;