/* https://darrengwon.tistory.com/557

next-redux-wrapper 6버전대 부터는 5버전과 사용방법이 많이 달라졌음
> Provider로 감싸지 않는다
> next-redux-wrapper가 알아서 store를 실은 후 자동으로 감싸줌

(6버전대에서 Provider를 사용한다거나 하면 legacy 경고가 날아옴)
 */

import {createStore, applyMiddleware, compose } from 'redux';
import {createWrapper} from 'next-redux-wrapper';
import {createLogger } from 'redux-logger';
import {composeWithDevTools} from 'redux-devtools-extension';

import rootReducer from './index';

const configureStore = () => {
    const logger = createLogger();
    const enhancer = compose(composeWithDevTools(applyMiddleware(logger)));
    const store = createStore(rootReducer, enhancer);

    return store;
}

const wrapper = createWrapper(configureStore, {debug: true});
// react에 redux를 붙이는건 어렵지 않음 (react app에서는 하나의 redux store만 존재하기 때문)
// Next를 사용하면서는 redux store가 여러개가 될 수 있음 (Next.js는 유저가 요청할 때마다 redux store를 새로 생성함)
// Next.js가 제공하는 getInitialProps, getServerSideProps 등에서 redux store에 접근할 수 있어야하는데, next-redux-wrapper가 없다면 불가능함
// ==> Next.js에서는 유저가 새로운 페이지를 요청할 때마다 redux store를 생성해야 하기 때문에 Wrapper가 필요함)

export default wrapper;