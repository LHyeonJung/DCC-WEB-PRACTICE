import React, { useCallback, useState } from 'react';
import Router from 'next/router'; //  CSR(Client Side Rendering)  방식으로 동작
import { useDispatch, useSelector, shallowEqual  } from 'react-redux';
import {setIdAction, setPwAction} from '../reducers/defaultAsset';
import loginImage from '../images/Light/Login.png'

const Login = () => {

    const dispatch = useDispatch(); // dispatch를 쉽게 사용하게 하는 hook

    const onIdChanged = useCallback((e)=> {
        dispatch(setIdAction(e.target.value));
    },[]);

    const onPwChanged = useCallback((e)=> {
        dispatch(setPwAction(e.target.value));
    },[]);

    const { ID, PW } = useSelector(
        state => ({
          ID: state.defaultAsset.get('id'),
          PW: state.defaultAsset.get('pw')
        }),
        shallowEqual
      ); // ==> reducer에서 MAP형식을 썼으니 .get으로 가져와야함

    // const ID = useSelector(state => state.defaultAsset.get('id'));
    // const PW = useSelector(state => state.defaultAsset.get('pw'));

    const loginClick = useCallback(()=> {
        // 로그인 검증

        console.log("loginClick!!");

        if(ID.length<=0 || PW.length<=0)
        {
            alert('아이디와 비밀번호를 모두 입력해야 합니다.');
            console.log("ID: "+ ID);
            console.log("PW: "+ PW);
        }
        else if(ID === "SA_USER")
        {
            Router.push('/dashboard');
        }
        else
        {
            alert('아이디 또는 비밀번호가 일치하지 않습니다.');
            console.log("ID: "+ ID);
            console.log("PW: "+ PW);
        }

    },[ID, PW]); // 어떤 값이 바뀌었을때 새로 함수를 생성할 것인지 배열안에 명시해줘야 함 !

    return (
        <div>
            <div style={{width: '640px', height:"350px", borderRadius: "15px",
                    border:"1px solid grey", margin:"5%", backgroundImage:`url(${loginImage})` }}>
                <h1 style={{marginLeft:"10px"}}> D'Amo Control Center </h1>
                <h4 style={{marginLeft:"10px", marginBottom:"30px"}}>
                    D'Amo 제품 통합 관리의 시작, <br/>
                    그 시작을 DCC와 함께하세요. <br/>
                    후회되지 않을 당신의 선택입니다.
                </h4>

                <input type="text" name="input_ID" onChange={onIdChanged} className="DefaultTextInput" placeholder="아이디 입력"/>
                <input type="text" name="input_PW" onChange={onPwChanged} className="DefaultTextInput" placeholder="비밀번호 입력"/>
                <button className="DefaultButton" onClick={loginClick}> 로그인 </button>
            </div>
        </div>
    );
};

export default Login;