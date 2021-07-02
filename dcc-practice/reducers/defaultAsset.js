import {createAction, handleActions} from 'redux-actions';
import {Map} from 'immutable';

// 액션 타입 정의
// const GET_CERT_PATH = "defaultAsset/GET_CERT_PATH"; // GET 관리도구 인증서 경로 
// const GET_KEY_PATH = "defaultAsset/GET_KEY_PATH"; // GET 관리도구 키 경로 
// const GET_SITE_PATH = "defaultAsset/GET_SITE_PATH" // GET 사이트 인증서 경로
// const GET_CERT_PW = "defaultAsset/GET_CERT_PW" // GET 인증서 비밀번호

const SET_CERT_PATH = "defaultAsset/SET_CERT_PATH"; // SET 관리도구 인증서 경로 
const SET_KEY_PATH = "defaultAsset/SET_KEY_PATH"; // SET 관리도구 키 경로 
const SET_SITE_PATH = "defaultAsset/SET_SITE_PATH" // SET 사이트 인증서 경로
const SET_CERT_PW = "defaultAsset/SET_CERT_PW" // SET 사이트 인증서 경로


// 액션 생성 함수
// export const getCertPathAction = createAction(GET_CERT_PATH);
// export const getKeyPathAction = createAction(GET_KEY_PATH);
// export const getSitePathAction = createAction(GET_SITE_PATH);
// export const getCertPwAction = createAction(GET_CERT_PW);

export const setCertPathAction = createAction(SET_CERT_PATH, value => value);
export const setKeyPathAction = createAction(SET_KEY_PATH, value => value);
export const setSitePathAction = createAction(SET_SITE_PATH, value => value);
export const setCertPwAction = createAction(SET_CERT_PW, value => value);

// 모듈 초기 상태
const initialState = Map({ 
    certPath: '',
    keyPath: '',
    sitePath: '',
    certPw:''
});

// 값들이 LIST,MAP,Record 등이 아니라면 state.set를 못씀 => Map으로 변경
export default handleActions(
    {
        // [GET_CERT_PATH]: (state) => { return state.get('certPath');},
        // [GET_KEY_PATH]: (state) => { return state.get('keyPath');},
        // [GET_SITE_PATH]: (state) => { return state.get('sitePath');},

        [SET_CERT_PATH]: (state, {payload:inputCertPath}) => { 
            console.log("(handleActions)SET_CERT_PATH: ",inputCertPath);
            return state.set('certPath', inputCertPath );
        },
        [SET_KEY_PATH]: (state, {payload:inputKeyPath}) => { 
            console.log("(handleActions)SET_KEY_PATH: ",inputKeyPath);
            return state.set('keyPath', inputKeyPath );
        },

        [SET_SITE_PATH]: (state, {payload:inputSitePath}) => { 
            console.log("(handleActions)SET_SITE_PATH: ",inputSitePath);
            return state.set('sitePath', inputSitePath );
        },

        [SET_CERT_PW]: (state, {payload:inputCertPw}) => { 
            console.log("(handleActions)SET_CERT_PW: ",inputCertPw);
            return state.set('certPw', inputCertPw );
        }

        // [GET_CERT_PATH]: (state) => {
        //     const certPath = state.get('certPath');
        //     console.log("(handleActions)GET_CERT_PATH: ", certPath);
        //     return certPath;
        // },

        // [GET_KEY_PATH]: (state) => { 
        //     const keyPath = state.get('keyPath');
        //     console.log("(handleActions)GET_KEY_PATH: ", keyPath);
        //     return keyPath;
        // },

        // [GET_SITE_PATH]: (state) => { 
        //     const sitePath = state.get('sitePath');
        //     console.log("(handleActions)GET_SITE_PATH: ", sitePath);
        //     return sitePath;
        // },

        // [GET_CERT_PW]: (state) => { 
        //     const certPw = state.get('certPw');
        //     console.log("(handleActions)GET_CERT_PW: ", certPw);
        //     return certPw;
        // }
    },
    initialState
);
