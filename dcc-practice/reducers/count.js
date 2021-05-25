
// https://velog.io/@ansrjsdn/Next.js%EC%97%90%EC%84%9C-Redux-%EC%82%AC%EC%9A%A9%ED%95%B4%EB%B3%B4%EA%B8%B0
//https://velog.io/@bigbrothershin/Redux-Next.js%EC%99%80-Redux-%EA%B0%99%EC%9D%B4-%EC%93%B0%EA%B8%B0

/*
-----------
Ducks구조
1. 액션 타입 정의
2. 액션 생성 함수
3. 모듈 초기 상태 정의
4. 리듀서 함수 정의
-----------
 */
import {createAction, handleActions} from 'redux-actions';



// [1. 액션 타입 정의]
export const COUNT_PLUS = 'COUNT_PLUS';
export const COUNT_MINUS = 'COUNT_MINUS';



// [2. 액션 생성 함수 정의]
export const countPlusAction = createAction(COUNT_PLUS);
export const countMinusAction = createAction(COUNT_MINUS);
// export const countPlusAction = () => ({
//     type: COUNT_PLUS
// });

// export const countMinusAction = () => ({
//     type:COUNT_MINUS
// });



// [3. 초기 값 설정] - // 처음 state값으로 count 0 설정 (state 값은 객체, 배열로도 사용 가능 )
const initialState ={
    number: 0
};

// // [4. 리듀서 함수] - handleActions(액션 처리 함수들로 이루어진 객체, 초기 상태)
export default handleActions
(   
    {
    // 첫번째 인자: 액션 처리 함수들로 이루어진 객체
    // [COUNT_PLUS]: (state, action) => { return {number: state.number +1 }; }, 

    [COUNT_PLUS]: ({number}) => ({ number: number +1 }),
    [COUNT_MINUS]: ({number}) => ({ number: number -1 }) // action 객체를 참조하지 않으니 생략 가능, state는 비구조화 할당을 해서 코드 간소화
    }, 

    // 두번째 인자: 초기 상태
    initialState
); 

// const initialState = 0;
// const reducer = (state=initialState, action) => {
//     switch (action.type){
//         case COUNT_PLUS:
//             return state + 1;
//         case COUNT_MINUS:
//             return state - 1;
//         default:
//             return state;
//     }
// };

// export default reducer;