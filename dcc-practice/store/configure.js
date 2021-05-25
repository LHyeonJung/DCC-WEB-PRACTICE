// 스토어를 생성하는 함수를 만들어서 내보냄
// 이 함수는 store/index.js 에서 호출해서 사용하게됨

import { createStore } from 'redux';
import modules from './modules';

// 크롬 웹스토어에서 redux-devtools 라는 확장 프로그램을 설치하고 디버깅해볼 수 있음 (아래처럼 devTools 옵션을 선언하여 사용)
const configure = () => {
    // const store = createStore(modules); // createStore의 인자: reducer 함수
    const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    const store = createStore(modules, devTools);

    return store;
}

export default configure;