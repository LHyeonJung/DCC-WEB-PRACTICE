
/*
sa 구성
> SA 아이디
> IP
> PORT
> OS
> GROUP
 */

import {createAction, handleActions} from 'redux-actions';
import {Record, List, Map} from 'immutable';

// 액션 타입 정의
const CHANGE_SAINFO = "sa/CHANGE_SAINFO"; // 수정할 값 입력
const ADD_SAINFO = "sa/ADD_SAINFO"; // 사용자 추가
const REMOVE_SAINFO = "sa/REMOVE_SAINFO" // 사용자 제거


// 액션 생성 함수
export const changeSaInfoAction = createAction(CHANGE_SAINFO, value => value);
export const addSaInfoAction = createAction(ADD_SAINFO, value => value);
export const removeSaInfoAction = createAction(REMOVE_SAINFO, id=>id, pwd=>pwd);

// 모듈 초기값 설정
const initialState = Record({
    input:{},
    // saList: List()
    saList: List([
        {
            saId: 'SA1',
            saIp: '127.0.0.1',
            saPort: '34579',
            saOs: 'Window10',
            saGroup:'Group1'
          },
          {
            saId: 'SA2',
            saIp: '10.0.65.20',
            saPort: '34579',
            saOs: 'Linux',
            saGroup:'Group2'
          }])
})();

const saInfoRecord = Record({
    saId: '',
    saIp: '',
    saPort: '',
    saOs: '',
    saGroup: ''
})

function IsValidKey(pwd){
    // 키 검증 로직

    // 임시로직
    if(pwd === 'Qaeldkah9./') 
        return true;
    else 
        return false;
  }

// 리듀서 
export default handleActions(
    {
        [CHANGE_SAINFO]: (state, action) => state.set('saList', action.payload),
        // [CHANGE_SAINFO]: (state, {payload:inputvalue}) => {
        //     const index = state.get('saList').findIndex(item=>item.get('saId') === inputvalue.saId);
        //     return state.updateIn(['saList', index], inputvalue);
        // },
        [ADD_SAINFO]: (state, {payload:inputvalue}) => {
            console.log("[ADD_SAINFO]-{inputvalue}: ", inputvalue);
            return state.update('saList', saInfo => saInfo.push(inputvalue));
        },
        [REMOVE_SAINFO]: (state, {payload:id}, {meta:pwd})=>{
            const isValidKey = IsValidKey(pwd);
            if(isValidKey)
            {
                const index = state.get('saList').findIndex(item=>item.get('saId')===id);
                return state.deleteIn(['saList', index]);
            }
            else
            {
                console.log('비밀번호 검증 실패');
            }
        },
    }, initialState
);