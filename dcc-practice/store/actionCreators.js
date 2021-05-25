// 편의상, 나중에 액션 생성 함수들을 미리 바인딩해서 내보냄
    // ==> mapDispatchToProps를 일일이 하는 것이 귀찮을 때 

/*
액션 생성 함수를 미리 bind 하기 위해서는 먼저, 리덕스 스토어 인스턴스가 모듈화되어 불러올 수 있는 상태여야 함
(src/store/modules 아래에 counter, todo 관련하여 모듈화 해둔 상태)
*/
import { bindActionCreators } from 'redux';
import * as counterActions from './modules/counter';
// import * as todoActions from './modules/todo';
import store from './index';

/*
dispatch: action을 store에 전달함 (action을 참고하여 store를 새로운 값으로 갱신)
*/
const { dispatch } = store;

export const CounterActions = bindActionCreators(counterActions, dispatch);
// export const TodoActions = bindActionCreators(todoActions, dispatch);
