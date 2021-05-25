// https://velog.io/@ansrjsdn/Next.js%EC%97%90%EC%84%9C-Redux-%EC%82%AC%EC%9A%A9%ED%95%B4%EB%B3%B4%EA%B8%B0

import { combineReducers } from 'redux';
import count from './count';
import sa from './sa';
import defaultAsset from './defaultAsset';

const rootReducer = combineReducers({ count, sa, defaultAsset });

export default rootReducer;