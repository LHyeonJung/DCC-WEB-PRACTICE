import { Grid, TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useCallback, useState, useRef } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { addUserAction } from '../reducers/user';
import axios from 'axios';
import { List } from 'immutable';

const EnrollUserComponent = () => {
    const usertypes = [
        { title: '관리자' },
        { title: '일반 사용자'}

      ];

    const resettingRef = useRef(false); // 데이터를 동기식으로 사용하기 위함 (useState자체는 비동기식으로 운영되기 때문에 바로 업데이트 되지 않음 - 함수형 컴포넌트에서는 일반적으로 동기식 데이터를 useState로 관리하지 않음)

    const initialStateInputInfo = {
        id: "",
        pass: "",
        isSuperUser: "",
        userName: "",
        isSecurityAgent: "",
        role: "",
        isOTP: "",
        isignOTPShared: "",
        Explanation: "",
        mail: "",
        phone: "",
        department: "",
        rank: "",
        isDuplicateLogin: "",
        serverGroupAccessibility: "",
        menuAccessibility: "",
        info:""
      };

    //   const initialUserInfoAll = {
    //     id: "",
    //     pass: "",
    //     isSuperUser: "false",
    //     userName: "",
    //     isSecurityAgent: "false",
    //     role: null,
    //     isOTP: "false",
    //     isignOTPShared: "false",
    //     Explanation: "",
    //     mail: "",
    //     phone: "",
    //     department: "",
    //     rank: "",
    //     isDuplicateLogin: "false",
    //     serverGroupAccessibility: "",
    //     menuAccessibility: "",
    //     info: "",
    //   };
    const initialUserInfoAll = {
        id: "",
        pass: "",
        isSuperUser: "",
        userName: "",
        isSecurityAgent: "",
        role: null,
        isOTP: "",
        isignOTPShared: "",
        Explanation: "",
        mail: "",
        phone: "",
        department: "",
        rank: "",
        isDuplicateLogin: "",
        serverGroupAccessibility: "",
        menuAccessibility: "",
        info: "",
      };

      // https://developer.mozilla.org/ko/docs/Learn/JavaScript/Objects/JSON
 
    const [inputInfoAll, setInputInfoAll]= useState(initialStateInputInfo); // 사용자 등록 시 입력값
    const [userInfoAll, setUserInfoAll]= useState(initialUserInfoAll); // DB에 등록할 user 정보
    const [passCheckValue, setPassCheckValue] = useState("");

    const dispatch = useDispatch(); // dispatch를 쉽게 사용하게 하는 hook

    function onChangeInput(e){
        const { name, value } = e.target;
        // console.log("name: "+ name);
        // console.log("value: "+ value);

        if(name === "passCheckValue"){
            setPassCheckValue(value);
        }

        else{
            // setInputInfoAll({
            //     ...inputInfoAll,
            //     [name]: value
            // });

            // if(name === "isSuperUser"){
            //     setUserInfoAll({
            //         ...userInfoAll,
            //         isSuperUser: value==="관리자"? "true": "false"
            //     });
            // }
    
            // else if(name === "isOTP"){
            //     setUserInfoAll({
            //         ...userInfoAll,
            //         isOTP: value==="사용"? "true": "false"
            //     });
            // }
    
            // else if(name === "isDuplicateLogin"){
            //     setUserInfoAll({
            //         ...userInfoAll,
            //         isDuplicateLogin: value==="허용"? "true": "false"
            //     });
            // }
            // else{
            //     setUserInfoAll({
            //         ...userInfoAll,
            //         [name]: value
            //     });
            // }

            setUserInfoAll({
                ...userInfoAll,
                [name]: value
            });
        }
    }
    
    useEffect(() => {
        if (resettingRef.current) {
            resettingRef.current = false;

            /*
                JSON으로 변환하여 info에 넣기 https://derveljunit.tistory.com/214 
                -반대[JSON문자열→JavaScript객체로 변환] JSON.parse(jsonData);
                https://developer.mozilla.org/ko/docs/Learn/JavaScript/Objects/JSON
             */

            var infoJsonData_temp = JSON.stringify(userInfoAll); // 별도 키워드들의 값을 정제해서 넣고, 그걸 info 형태로 묶어서 넣기
            var info_all = [infoJsonData_temp]; 
            var info_list = {list: info_all};
            var info_userInfo = {user_info: info_list};

            // console.log("info_all: "+info_all);
            // console.log("info_list: "+ info_list);
            // console.log("info_userInfo: "+ info_userInfo.user_info.list[0]);
            var infoJsonData = JSON.stringify(info_userInfo); // 반대[JSON문자열→JavaScript객체로 변환] JSON.parse(jsonData);
            // console.log("json data!! "+ infoJsonData);

            setUserInfoAll({
                ...userInfoAll,
                info:infoJsonData
            });
            resettingRef.current = true;
        }
      }, [userInfoAll]); 

      useEffect(() => {
        if (resettingRef.current) {
            resettingRef.current = false;
            dataUpdate();
        }
      }, [userInfoAll.info]); 

    const onClickEnrollUser = (e)=> {
        if(userInfoAll.pass != passCheckValue){
            alert("비밀번호가 일치하지 않습니다.");
        }
        else{
            // * onChangeInput가 아닌, input data를 이용해서 마지막에 정제해서 db에 넣고싶은데 이렇게 하면 inputInfoAll 변경내용이 갱신되지 않은 상태로 사용하려고 시도함
            // setUserInfoAll({
            //     ...inputInfoAll,
            //     isSuperUser: inputInfoAll.isSuperUser==="관리자"? "true": "false",
            //     isSecurityAgent: inputInfoAll.isSuperUser==="true"?"true":"false",
            //     isignOTPShared: "false",
            //     role: inputInfoAll.role===""?null:inputInfoAll.role,
            //     isOTP: inputInfoAll.isOTP==="사용"? "true": "false",
            //     isDuplicateLogin: inputInfoAll.isDuplicateLogin==="허용"? "true": "false",
            // });

            // 선택/입력 값에 따라 enum 값으로 치환
            setUserInfoAll({
                 ...userInfoAll,
                 isSuperUser: userInfoAll.isSuperUser==="관리자"? "true": "false",
                 isSecurityAgent: userInfoAll.isSecurityAgent===""? "false": "true",
                 isOTP: userInfoAll.isOTP==="사용"? "true": "false",
                 isDuplicateLogin: userInfoAll.isDuplicateLogin==="허용"? "true": "false",
                 isignOTPShared: userInfoAll.isignOTPShared===""? "false": userInfoAll.isignOTPShared,
             });

             resettingRef.current = true; 
        }
    }

    const dataUpdate = useCallback(()=> {
        InsertUser(userInfoAll);

        // 입력 데이터 초기화
        setInputInfoAll({...initialStateInputInfo}); 
        setUserInfoAll({...initialUserInfoAll}); 
        setPassCheckValue("");
        alert("사용자 등록 완료");
    }, [userInfoAll]);


    const InsertUser = useCallback(async(targetData) => {
        const {id, pass, isSuperUser, userName, isSecurityAgent, role, isOTP, isignOTPShared,Explanation,mail, phone, department,  rank,  isDuplicateLogin, serverGroupAccessibility, menuAccessibility, info} = targetData;
        const userList = [id, pass, isSuperUser, isSecurityAgent, role, isOTP, isignOTPShared, info]; 
        console.log("userlist--: "+ userList);
        const res = await axios('http://localhost:4000/insert_user', {
            method: 'POST',
            data: {'data': userList},
            headers: new Headers()
        })
        // console.log("res"+ res);
    },[]);
      
    return (
        <div>
            <a className="componentTitle">사용자 등록</a>
            <a className="componentDesc">DCC에 사용자를 등록합니다.</a>

            <Grid container spacing={1} style={{margin:"20px"}}>
                <Grid item xs={11} sm={2} >
                    <a style={{display:"block", float:"right",width:"140px", height:"30px", background:"lightGrey"}} >ID*</a>
                    <a style={{display:"block", float:"right",width:"140px", height:"30px", background:"lightGrey", marginTop:"5px"}}>비밀번호*</a>
                    <a style={{display:"block", float:"right",width:"140px", height:"30px", background:"lightGrey", marginTop:"5px"}}>비밀번호 확인*</a>
                    <a style={{display:"block", float:"right",width:"140px", height:"30px", background:"lightGrey", marginTop:"5px"}}>사용자명*</a>
                    {/* <a style={{display:"block", width:"100px", height:"30px", background:"lightGrey", marginTop:"5px"}}>계정 상태*</a> */}
                    <a style={{display:"block", float:"right",width:"140px", height:"30px", background:"lightGrey", marginTop:"5px"}}>사용자 타입*</a>
                    <a style={{display:"block", float:"right",width:"140px", height:"30px", background:"lightGrey", marginTop:"5px"}}>mOTP*</a>
                    <a style={{display:"block", float:"right",width:"140px", height:"30px", background:"lightGrey", marginTop:"5px"}}>중복 로그인*</a>
                    <a style={{display:"block", float:"right",width:"140px", height:"30px", background:"lightGrey", marginTop:"5px"}}>설명</a>
                    <a style={{display:"block", float:"right",width:"140px", height:"30px", background:"lightGrey", marginTop:"5px"}}>이메일*</a>
                    <a style={{display:"block", float:"right",width:"140px", height:"30px", background:"lightGrey", marginTop:"5px"}}>휴대폰*</a>
                    <a style={{display:"block", float:"right",width:"140px", height:"30px", background:"lightGrey", marginTop:"5px"}}>부서</a>
                    <a style={{display:"block", float:"right",width:"140px", height:"30px", background:"lightGrey", marginTop:"5px"}}>직급</a>
                    <a style={{display:"block", float:"right",width:"140px", height:"30px", background:"lightGrey", marginTop:"5px"}}>서버 그룹 접근 권한</a>
                    <a style={{display:"block", float:"right",width:"140px", height:"30px", background:"lightGrey", marginTop:"5px"}}>메뉴 접근 권한</a>
                </Grid>
                <Grid item xs={11} sm={5} >
                    <input type="text" name="id" value={userInfoAll.id} onChange={onChangeInput} style={{display:"block", width:"350px", height:"30px",}} placeholder="5~20자의 영문 소문자, 숫자와 특수기호(_),(-)"/>
                    <input type="text" name="pass" value={userInfoAll.pass} onChange={onChangeInput} style={{display:"block", width:"350px", height:"30px", marginTop:"5px"}} placeholder="8~16자 영문 대 소문자, 숫자, 특수문자 사용"/>
                    <input type="text" name="passCheckValue" value={passCheckValue} onChange={onChangeInput} style={{display:"block", width:"350px", height:"30px", marginTop:"5px"}} placeholder="비밀번호와 동일하게 입력하세요"/>
                    <input type="text" name="userName" value={userInfoAll.userName}  onChange={onChangeInput} style={{display:"block", width:"350px", height:"30px", marginTop:"5px"}} placeholder="사용자명을 입력하세요(40자 이하)"/>
                    <input type="text" name="isSuperUser" value={userInfoAll.isSuperUser} onChange={onChangeInput} style={{display:"block", width:"350px", height:"30px", marginTop:"5px"}} placeholder="계정 상태 입력(관리자/일반 사용자)"/>
                    <input type="text" name="isOTP" value={userInfoAll.isOTP} onChange={onChangeInput} style={{display:"block", width:"350px", height:"30px", marginTop:"5px"}} placeholder="사용 여부 입력(사용/미사용)"/>
                    <input type="text" name="isDuplicateLogin" value={userInfoAll.isDuplicateLogin} onChange={onChangeInput} style={{display:"block", width:"350px", height:"30px", marginTop:"5px"}} placeholder="허용 여부 선택"/>
                    <input type="text" name="Explanation" value={userInfoAll.Explanation} onChange={onChangeInput} style={{display:"block",  width:"350px", height:"30px", marginTop:"5px"}} placeholder="설명"/>
                    <input type="text" name="mail" value={userInfoAll.mail} onChange={onChangeInput} style={{display:"block", width:"350px", height:"30px", marginTop:"5px"}} placeholder="이메일을 입력"/>
                    <input type="text" name="phone" value={userInfoAll.phone}  onChange={onChangeInput} style={{display:"block", width:"350px", height:"30px", marginTop:"5px"}} placeholder="휴대폰 번호 입력"/>
                    <input type="text" name="department" value={userInfoAll.department} onChange={onChangeInput} style={{display:"block", width:"350px", height:"30px", marginTop:"5px"}} placeholder="부서를 입력하세요(40자 이하)"/>
                    <input type="text" name="rank" value={userInfoAll.rank}  onChange={onChangeInput} style={{display:"block", width:"350px", height:"30px", marginTop:"5px"}} placeholder="직급을 입력하세요(40자 이하)"/>
                    <input type="text" name="serverGroupAccessibility" value={userInfoAll.serverGroupAccessibility}  onChange={onChangeInput} style={{display:"block", width:"350px", height:"30px", marginTop:"5px"}} placeholder="선택"/>
                    <input type="text" name="menuAccessibility" value={userInfoAll.menuAccessibility} onChange={onChangeInput} style={{display:"block", width:"350px", height:"30px", marginTop:"5px"}} placeholder="선택"/>

                    {/* <Autocomplete 
                        id="combo-box-demo"
                        options={usertypes}
                        getOptionLabel={(option) => option.title}
                        style={{ marginLeft:"10px", width:"350px", height:"5px", marginTop:"5px" }}
                        renderInput={(params) => <TextField  onChange={onChangeInput} name="isSuperUser" {...params} label="계정 상태 선택" variant="outlined" />}
                        />
                    <Autocomplete 
                        id="combo-box-demo"
                        options={["사용","사용안함"]}
                        getOptionLabel={(option) => option.title}
                        style={{ marginLeft:"10px", width:"350px", height:"5px", marginTop:"5px" }}
                        renderInput={(params) => <TextField {...params} label="사용 여부 선택" variant="outlined" />}
                        /> */}

                </Grid>
            </Grid>
            <button style={{width:"50px", display:"block", marginLeft:"20px"}} onClick={onClickEnrollUser}>등록</button>
            
        </div>
    );
};

export default EnrollUserComponent;