import '../styles/globals.css'
import '../components/public/Modal.css';
import wrapper from '../reducers/configureStore';
import React, {useState, useEffect} from 'react';

function MyApp({ Component, pageProps }) {
   // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)

  return (
    <Component {...pageProps} />
  )
}

export default wrapper.withRedux(MyApp);
// react에 redux를 붙이는건 어렵지 않음 (react app에서는 하나의 redux store만 존재하기 때문)
// Next를 사용하면서는 redux store가 여러개가 될 수 있음 (Next.js는 유저가 요청할 때마다 redux store를 새로 생성함)
// Next.js가 제공하는 getInitialProps, getServerSideProps 등에서 redux store에 접근할 수 있어야하는데, next-redux-wrapper가 없다면 불가능함


/* [next-redux-wrapper 5버전에서 아래와 같이 사용] */

// import React from 'react';
// import withRedux from 'next-redux-wrapper';
// import { Provider } from 'react-redux';
// import {createStore, compose, applyMiddleware } from 'redux';
// import reducer from '../reducers';
// import {composeWithDevTools} from 'redux-devtools-extension';

// /* react-redux의 Provider로 Component를 묶어주어 모든 컴포넌트에서 redux store를 사용할 수 있게 함 */
// const Test = ({ Component, store, pageProps}) => {
//   return (
//     <Provider store={store}> 
//       <Component {...pageProps}/>
//     </Provider>
//   );
// };


// /* 
// store의 관한 설정해줌
// - enhancer로 미들웨어들에 대한 설정을 넣어줄 수 있음 (compose 또는 composeWithDevTools로 여러 미들웨어를 합침)
// - 아래 코드는 배포환경일 땐 그냥 미들웨어를, 개발환경일 땐 redux-devtools를 사용할 수 있게 한것)
//  */
// const configureStore = (initialState, options)=>{
//   const middlewares = []; // 미들웨어 담으면 됨
//   const enhancer = process.env.NODE_ENV === 'production' ?
//     compose(applyMiddleware(...middlewares)):
//     composeWithDevTools(applyMiddleware(...middlewares));
//   const store = createStore(reducer, initialState, enhancer);
//   return store;
// }

// export default withRedux(configureStore, Test);



// [원본 코드]
// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }

// export default MyApp
