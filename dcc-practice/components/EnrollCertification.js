import React, { useCallback, useState } from 'react';
import Router from 'next/router'; //  CSR(Client Side Rendering)  방식으로 동작
import { useDispatch, useSelector, shallowEqual  } from 'react-redux';
// import {setCertPathAction, setKeyPathAction, setSitePathAction, setCertPwAction, getCertPathAction, getKeyPathAction, getSitePathAction, getCertPwAction} from '../reducers/defaultAsset';
import {setCertPathAction, setKeyPathAction, setSitePathAction, setCertPwAction} from '../reducers/defaultAsset';
import DragAndDrop from './public/DragAndDrop';
import { Map } from 'immutable';

// 참고 [https://www.nicesnippets.com/blog/react-js-file-upload-example-with-axios]
function EnrollCertification() {
    console.log("EnrollCertification 렌더링");

    // let [dccCertPath, setDccCertPath] = useState("");
    // let [dccKeyPath, setDccKeyPath] = useState("");
    // let [siteCertPath, setSiteCertPath] = useState("");
    // let [dccCertPw, setDccCertPw] = useState("");

    const [files, setFiles] = useState(['nice.pdf', 'good.cer']);

    const dispatch = useDispatch(); // dispatch를 쉽게 사용하게 하는 hook

    // [별도로 useSelector 사용하는 예제]
    // const certPath = useSelector(state => state.defaultAsset.certPath); // store의 state.certPath를 불러오는 hook 
    // const keyPath = useSelector(state => state.defaultAsset.keyPath); // store의 state.keyPath를 불러오는 hook 
    // const sitePath = useSelector(state => state.defaultAsset.sitePath); // store의 state.sitePath를 불러오는 hook 
    // const certPw = useSelector(state => state.defaultAsset.certPw); // store의 state.certPw를 불러오는 hook 

    const { cert_Path, key_Path, site_Path, cert_Pw } = useSelector(
        state => ({
          cert_Path: state.defaultAsset.get('certPath'),
          key_Path: state.defaultAsset.get('keyPath'),
          site_Path: state.defaultAsset.get('sitePath'),
          cert_Pw: state.defaultAsset.get('certPw')
        }),
        shallowEqual
      ); // undefined 타입이 되는데, 이 타입은 값이 없어서 값이 할당되지 않은 변수라는 의미 => 왜 값을 가져오지 못하는지..? ==> reducer에서 MAP형식을 썼으니 .get으로 가져와야함

    const onCertPathChanged = useCallback((e)=> {
        dispatch(setCertPathAction(e.target.files[0].name));
        console.log("[1Get cert_Path]   "+ cert_Path);
    },[]);

    const onKeyPathChanged = useCallback((e)=> {
        dispatch(setKeyPathAction(e.target.files[0].name));
        console.log("[1Get key_Path]   "+ key_Path);
    },[]);

    const onSitePathChanged = useCallback((e)=> {
        dispatch(setSitePathAction(e.target.files[0].name));
        console.log("[1Get site_Path]   "+ site_Path);
    },[]);

    const onCertPwChanged = useCallback((e)=> {
        dispatch(setCertPwAction(e.target.value));
        console.log("[1Get cert_Pw]   "+ cert_Pw);
    },[]);

    const onSubmitButtonClick = useCallback(()=> {
        console.log("[onSubmitButtonClick]");

        if(cert_Path.length != 0 && key_Path.length != 0 && site_Path.length != 0  && cert_Pw.length != 0)
        {
            console.log("모두 입력됨");
            console.log(cert_Path);
            console.log(key_Path);
            console.log(site_Path);
            console.log(cert_Pw);
            // (인증서 상호 검증 로직 필요)

            Router.push('/dashboard');
        }
        else
        {
            alert('3개 인증서 경로 및 인증서 비밀번호를 모두 입력해야함');
        }

    });

    // 키 검증 로직 필요 *


    const handleDrop = useCallback((files_props)=>{
        console.log("[props의 handleDrop 이벤트 탐]");
        console.log("인자로 받은 파일 수(drop한 파일 수): "+  files_props.length);

        let fileList = [...files];
        console.log("기존 업로드해둔 파일 수: "+  fileList.length);
        if(files_props.length>0)
        {
            for (var i=0; i<files_props.length; i++){
                console.log("drop한 파일 이름: ",i+"-"+ files_props[i].name);
                if(!files_props[i].name) return;
                fileList.push(files_props[i].name);
                setFiles(files => [...files,files_props[i].name]);
            }
        }
    });

    const handleFilterFile = useCallback((filename) =>
    {
        console.log("handleFilterFile 진입 "+ filename);
        setFiles(files.filter((file) => file !== filename));
    },
    [files]);

    return (
        <div>
            <h5>인증서 등록</h5>

            {/* <input value={certPath}/> */}
            <ul>
                <li>(*) DCC 인증서</li>
                {/* <input type="file" className="form-control" name="upload_file" style={{display:"block"}} onChange={e=>onCertPathSubmitClick(e.target.files[0])} /> */}
                <input type="file" className="form-control" name="upload_file" style={{display:"block"}} onChange={onCertPathChanged} accept=".cer" />

                <li style={{marginTop:"10px"}}>(*) 사이트 인증서</li>
                <input type="file" className="form-control" name="upload_file" style={{display:"block"}}  onChange={onKeyPathChanged} accept=".key"/>

                <li style={{marginTop:"10px"}}>(*) DCC 키</li>
                <input type="file" className="form-control" name="upload_file" style={{display:"block"}} onChange={onSitePathChanged} accept=".cer"/>

                <li style={{marginTop:"10px"}}>(*) 인증서 비밀번호</li>
                <input type="text" className="form-control" name="input_certPw" style={{display:"block"}} onChange={onCertPwChanged} />

            </ul>

            {/* https://salgum1114.github.io/nextjs/2019-05-24-nextjs-static-website-4/ */}
            <div>
                {/* <button onClick={() => Router.push('/dashboard')} style={{marginLeft:"40px"}}>확인</button> */}
                <button onClick={onSubmitButtonClick} style={{marginLeft:"40px"}}>확인</button>
            </div>

            <DragAndDrop handleDrop={handleDrop}>
                <div style={{margin:'10%', height: 350, width: 500, border: 'dashed grey 2px',}}>
                    {files.length>0 && files.map((file) =>
                        <div style={{marginTop: '2%', marginLeft: '2%'}} key={file}>
                            <div style={{display:'inline'}}>{file}</div>
                            <div className="RemoveButton" onClick={() => handleFilterFile(file)}>X</div>
                        </div>
                    )}
                </div>
            </DragAndDrop>
        </div>
    );
};

export default EnrollCertification;