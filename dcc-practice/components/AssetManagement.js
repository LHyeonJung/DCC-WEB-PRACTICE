import React, {useEffect, useState, useCallback} from 'react';
import {Record, List, Map} from 'immutable';
import { useDispatch, useSelector } from 'react-redux';
import {removeSaInfoAction} from '../reducers/sa';

const AssetItem = ({saId, saIp, saPort, saOs, saGroup, onRemove}) => {
    // <li onClick={()=> onChange(saId)} onRemove={()=>onRemove(saId)}>
    //     {saId}
    // </li>
    <li on>
        <h4>
            {saId} {saIp} {saPort} {saOs} {saGroup}
        </h4>
    </li>
}

const AssetManagement = ({assetList, onChange, onRemove, password})=>{
    // 이것때문에 build에 실패하고 있었음 (들어오는 targetId값이 없음)
    // useEffect(()=>
    // {
    //     console.log('targetId: ', targetId);
    // }, [targetId]);

    console.log("AssetManagement 렌더링");
    // console.log("assetList", assetList);
    
    let [targetId, setTargetId] = useState('');
    const dispatch = useDispatch(); // dispatch를 쉽게 사용하게 하는 hook

    const onClickRemove = useCallback(()=> {
        dispatch(removeSaInfoAction(targetId, password));
    }, []);

    const assetItems = assetList.map(
        asset => {
            const {saId, saIp, saPort, saOs, saGroup} = asset;
            const tempInfo = asset;
            return(
                <li>
                    <h5 style={{display:'inline'}}>
                        {saId} {saIp} {saPort} {saOs} {saGroup} 

                        <div
                            style={{display:'inline'}} 
                            onClick={(e)=>{
                            e.stopPropagation();
                            setTargetId({saId});
                            onRemove={onClickRemove}
                        }}> &times; </div>
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

    return (
        <div>
            <h4> L I S T </h4>
            <ul>
                { assetItems }
            </ul>
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