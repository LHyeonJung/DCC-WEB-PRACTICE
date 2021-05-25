import React, { useCallback, useState } from 'react';
import Router from 'next/router'; //  CSR(Client Side Rendering)  방식으로 동작
import { useDispatch, useSelector } from 'react-redux';
import {setCertPathAction, setKeyPathAction, setSitePathAction} from '../reducers/defaultAsset';

// 참고 [https://www.nicesnippets.com/blog/react-js-file-upload-example-with-axios]
function EnrollCertification() {
    console.log("EnrollCertification 렌더링");

    let [siteCertPath, setsiteCertPath] = useState("");
    let [dccCertPath, setdccCertPath] = useState("");
    let [dccKeyPath, setdccKeyPath] = useState("");
    let [dccCertPw, setdccCertPw] = useState("");

    const dispatch = useDispatch(); // dispatch를 쉽게 사용하게 하는 hook
    const certPath = useSelector(state => state.defaultAsset.certPath); // store의 state.certPath를 불러오는 hook 

    const onSubmitClick = useCallback(()=> {
        dispatch(setCertPathAction(dccCertPath));
        dispatch(setKeyPathAction(dccKeyPath));
        dispatch(setsiteCertPath(siteCertPath));
    },[]);

    // 키 검증 로직 필요 *

    return (
        <div>
            <h5>인증서 등록</h5>

            {/* <input value={certPath}/> */}
            <ul>
                <li>Site 인증서</li>
                <input type="file" className="form-control" name="upload_file" style={{display:"block"}} onChange={e=>setsiteCertPath(e.target.files[0])} />

                <li style={{marginTop:"10px"}}>DCC 인증서</li>
                <input type="file" className="form-control" name="upload_file" style={{display:"block"}}  onChange={e=>setdccCertPath(e.target.files[0])} />

                <li style={{marginTop:"10px"}}>DCC 키</li>
                <input type="file" className="form-control" name="upload_file" style={{display:"block"}} onChange={e=>setdccKeyPath(e.target.files[0])} />

                <li style={{marginTop:"10px"}}>인증서 비밀번호</li>
                <input type="file" className="form-control" name="input_certPw" style={{display:"block"}} onChange={e=>setdccCertPw(e.target.value)} />

            </ul>

            {/* https://salgum1114.github.io/nextjs/2019-05-24-nextjs-static-website-4/ */}
            <div>
                {/* <button onClick={() => Router.push('/dashboard')} style={{marginLeft:"40px"}}>확인</button> */}
                <button onClick={() => Router.push('/dashboard')} style={{marginLeft:"40px"}}>확인</button>
            </div>
        </div>
    );
};

export default EnrollCertification;