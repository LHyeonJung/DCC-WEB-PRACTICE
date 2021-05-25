// 모든 모듈들을 불러와서 합치는 작업이 이뤄짐


// 한 프로젝트에 여러개의 리듀서가 존재할 수 있음 => 여러개의 리듀서가 있을 때는, redux의 함수 combineReducers를 사용하여 하나의 리듀서로 합칠 수 있음
// 이렇게 합쳐진 리듀서 = "루트 리듀서(root reducer)"
import { combineReducers } from 'redux';
import counter from './counter';

export default combineReducers({ counter }); // 리듀서를 더 추가하려면 counter, 옆에 추가하면 됨