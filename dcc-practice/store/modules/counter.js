// 카운터 관련 상태 로직
    // 카운터 관련하여 필요한 리덕스 모듈을 작성할 것임

    import {createAction, handleActions} from 'redux-actions';

    /* 
    [ 이렇게 하나의 파일에 액션, 리듀서를 함께 작성하여 관리하는 것: Ducks 구조 ]
    - 이 구조에선 리덕스 관련 코드를 기능별로 하나의 파일에 나누어 작성함
    - 액션 이름을 만들 때는 const를 사용하여 레퍼런스에 문자열을 담음 (앞에 도메인 추가함으로서 다른 모듈에서 동일한 액션 이름을 가질 수 있음)
    */
    
    // 1. redex-actions 활용
    
    // 액션 타입 정의
    const INCREMENT = 'counter/INCREMENT';
    const DECREMENT = 'counter/DECREMENT';
    
    // 액션 생성 함수 - 나중에 다른 파일에서 호출해야 하니까 내보내기
    /* createAction을 통한 사용법 */
    export const increment = createAction(INCREMENT);
    export const decrement = createAction(DECREMENT);
    
    // 모듈의 초기 상태 정의
    const initialState = { 
        number: 0 
    };
    
    // 리듀서 함수 - handleActions(액션 처리 함수들로 이루어진 객체, 초기 상태)
    export default handleActions
    (   
        {
        // 첫번째 인자: 액션 처리 함수들로 이루어진 객체
        [INCREMENT]: (state, action) => { return {number: state.number +1 }; }, 
        [DECREMENT]: ({number}) => ({ number: number -1 }) // action 객체를 참조하지 않으니 생략 가능, state는 비구조화 할당을 해서 코드 간소화
        }, 
    
        // 두번째 인자: 초기 상태
        initialState
    ); 