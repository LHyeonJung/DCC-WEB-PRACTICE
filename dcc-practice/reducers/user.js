//임시 (일단 SA 추가/수정쪽부터 해보려고 함)
/*
user 구성
> 사용자 아이디
> 사용자 비밀번호
> 권한
> 소속부서
 */

import {createAction, handleActions} from 'redux-actions';
import {Record, List} from 'immutable';

// 액션 타입 정의
//const CHANGE_USERINFO = "user/CHANGE_USERINFO"; // 수정할 값 입력
//const SAVE_USERINFO = "user/SAVE_USERINFO"; // 정보 저장
const INIT_USERINFO = "user/INIT_USERINFO"; // 사용자 정보 초기화
const ADD_USERINFO = "user/ADD_USERINFO"; // 사용자 추가
const REMOVE_USERINFO = "user/REMOVE_USERINFO" // 사용자 제거


// 액션 생성 함수
//export const changeUserInfo = createAction(CHANGE_USERINFO, value => value);
//export const saveUserInfo = createAction(SAVE_USERINFO, value=>value);
export const initUserAction = createAction(INIT_USERINFO);
export const addUserAction = createAction(ADD_USERINFO, value => value);
export const removeUserAction = createAction(REMOVE_USERINFO, id=>id);

// 모듈 초기값 설정
const initialState = Record({
    input:{},
    userList: List([])
})();

const userInfoRecord = Record({
    id: '',
    pass: null,
    isSuperUser: null,
    isSecurityAgent: null,
    role: null,
    isOTP: null,
    isignOTPShared: null,
    info: null
})

// 리듀서 
export default handleActions(
    {
        [INIT_USERINFO]: (state) => {
            console.log("[INIT_USERINFO]");
            return state.clear('userList');
        },
        [ADD_USERINFO]: (state, {payload:inputvalue}) => {
            console.log("[ADD_USERINFO]-{inputvalue}: ", inputvalue);
            return state.update('userList', userInfo => userInfo.push(inputvalue));
        },
        [REMOVE_USERINFO]: (state, {payload:id})=>{
            const index = state.get('userList').findIndex(item=>item.id===id);
            return state.deleteIn(['userList', index]);
        }
    }, initialState
);