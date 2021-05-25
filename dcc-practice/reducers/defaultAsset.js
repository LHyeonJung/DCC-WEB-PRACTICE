import {createAction, handleActions} from 'redux-actions';
import {Record, List, Map} from 'immutable';

// 액션 타입 정의
const GET_CERT_PATH = "defaultAsset/GET_CERT_PATH"; // GET 관리도구 인증서 경로 
const GET_KEY_PATH = "defaultAsset/GET_KEY_PATH"; // GET 관리도구 키 경로 
const GET_SITE_PATH = "defaultAsset/GET_SITE_PATH" // GET 사이트 인증서 경로

const SET_CERT_PATH = "defaultAsset/SET_CERT_PATH"; // SET 관리도구 인증서 경로 
const SET_KEY_PATH = "defaultAsset/SET_KEY_PATH"; // SET 관리도구 키 경로 
const SET_SITE_PATH = "defaultAsset/SET_SITE_PATH" // SET 사이트 인증서 경로


// 액션 생성 함수
export const getCertPathAction = createAction(GET_CERT_PATH);
export const getKeyPathAction = createAction(GET_KEY_PATH);
export const getSitePathAction = createAction(GET_SITE_PATH);

export const setCertPathAction = createAction(SET_CERT_PATH, value => value);
export const setKeyPathAction = createAction(SET_KEY_PATH, value => value);
export const setSitePathAction = createAction(SET_SITE_PATH, value => value);

// 모듈 초기 상태
const initialState = { 
    certPath: '',
    keyPath: '',
    sitePath: ''
};

export default handleActions(
    {
        [GET_CERT_PATH]: (state) => { return state.get('certPath');},
        [GET_KEY_PATH]: (state) => { return state.get('keyPath');},
        [GET_SITE_PATH]: (state) => { return state.get('sitePath');},

        [SET_CERT_PATH]: (state, {payload:inputCertPath}) => { return state.update('certPath', inputCertPath );},
        [SET_KEY_PATH]: (state, {payload:inputKeyPath}) => { return state.update('keyPath', inputKeyPath );},
        [SET_SITE_PATH]: (state, {payload:inputSitePath}) => { return state.update('sitePath', inputSitePath );}
    },
    initialState
);