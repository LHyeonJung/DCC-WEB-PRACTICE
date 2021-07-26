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

    // const [inputInfo, setInputInfo]= useState({
    //     id: null,
    //     pass: null,
    //     isSuperUser: null,
    //     userName: null,
    //     isSecurityAgent: null,
    //     role: null,
    //     isOTP: null,
    //     isignOTPShared: null,
    //     Explanation: null,
    //     mail: null,
    //     phone: null,
    //     department: null,
    //     rank: null,
    //     isDuplicateLogin: null,
    //     serverGroupAccessibility: null,
    //     menuAccessibility: null,
    // })
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

      const initialUserInfoAll = {
        id: "",
        pass: "",
        isSuperUser: "false",
        userName: "",
        isSecurityAgent: "false",
        role: null,
        isOTP: "false",
        isignOTPShared: "false",
        Explanation: "",
        mail: "",
        phone: "",
        department: "",
        rank: "",
        isDuplicateLogin: "false",
        serverGroupAccessibility: "",
        menuAccessibility: "",
        info: "",
      };

    // const [inputInfoAll, setInputInfoAll]= useState({
    //     id: null,
    //     pass: null,
    //     isSuperUser: null,
    //     userName: null,
    //     isSecurityAgent: null,
    //     role: null,
    //     isOTP: null,
    //     isignOTPShared: null,
    //     Explanation: null,
    //     mail: null,
    //     phone: null,
    //     department: null,
    //     rank: null,
    //     isDuplicateLogin: null,
    //     serverGroupAccessibility: null,
    //     menuAccessibility: null,
    //     info: null, // info형태: { userInfo{ list[{}] } }
    // })
    const [inputInfoAll, setInputInfoAll]= useState(initialStateInputInfo);
    const [userInfoAll, setUserInfoAll]= useState(initialUserInfoAll);
    const [passCheckValue, setPassCheckValue] = useState("");
    // const [userInfo, setUserInfo] = useState({
    //     list: []
    // });

    const dispatch = useDispatch(); // dispatch를 쉽게 사용하게 하는 hook

    function onChangeInput(e){
        const { name, value } = e.target;
        // console.log("name: "+ name);
        // console.log("value: "+ value);

        if(name === "passCheckValue"){
            setPassCheckValue(value);
        }

        else{
            setInputInfoAll({
                ...inputInfoAll,
                [name]: value
            });

            if(name === "isSuperUser"){
                setUserInfoAll({
                    ...userInfoAll,
                    isSuperUser: value==="관리자"? "true": "false"
                });
            }
    
            else if(name === "isOTP"){
                setUserInfoAll({
                    ...userInfoAll,
                    isOTP: value==="사용"? "true": "false"
                });
            }
    
            else if(name === "isDuplicateLogin"){
                setUserInfoAll({
                    ...userInfoAll,
                    isDuplicateLogin: value==="허용"? "true": "false"
                });
            }
            else{
                setUserInfoAll({
                    ...userInfoAll,
                    [name]: value
                });
            }
        }
    }
    
    useEffect(() => {
        if (resettingRef.current) {
            resettingRef.current = false;
            dataUpdate();
        }
      }, [userInfoAll.info]);

    const onClickEnrollUser = (e)=> {
        if(inputInfoAll.pass != passCheckValue){
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

             // JSON으로 변환하여 info에 넣기 https://derveljunit.tistory.com/214 
             console.log("***");
             var infoJsonData = JSON.stringify(userInfoAll); // 반대[JSON문자열→JavaScript객체로 변환] JSON.parse(jsonData);
             console.log("json data!! "+ infoJsonData);

             // 나머지 데이터 포함하여 DB에 넣을 데이터로 정제
             setUserInfoAll({
                 ...userInfoAll,
                 info:infoJsonData
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
                    <input type="text" name="id" value={inputInfoAll.id} onChange={onChangeInput} style={{display:"block", width:"350px", height:"30px",}} placeholder="5~20자의 영문 소문자, 숫자와 특수기호(_),(-)"/>
                    <input type="text" name="pass" value={inputInfoAll.pass} onChange={onChangeInput} style={{display:"block", width:"350px", height:"30px", marginTop:"5px"}} placeholder="8~16자 영문 대 소문자, 숫자, 특수문자 사용"/>
                    <input type="text" name="passCheckValue" value={passCheckValue} onChange={onChangeInput} style={{display:"block", width:"350px", height:"30px", marginTop:"5px"}} placeholder="비밀번호와 동일하게 입력하세요"/>
                    <input type="text" name="userName" value={inputInfoAll.userName}  onChange={onChangeInput} style={{display:"block", width:"350px", height:"30px", marginTop:"5px"}} placeholder="사용자명을 입력하세요(40자 이하)"/>
                    <input type="text" name="isSuperUser" value={inputInfoAll.isSuperUser} onChange={onChangeInput} style={{display:"block", width:"350px", height:"30px", marginTop:"5px"}} placeholder="계정 상태 입력(관리자/일반 사용자)"/>
                    <input type="text" name="isOTP" value={inputInfoAll.isOTP} onChange={onChangeInput} style={{display:"block", width:"350px", height:"30px", marginTop:"5px"}} placeholder="사용 여부 입력(사용/미사용)"/>
                    <input type="text" name="isDuplicateLogin" value={inputInfoAll.isDuplicateLogin} onChange={onChangeInput} style={{display:"block", width:"350px", height:"30px", marginTop:"5px"}} placeholder="허용 여부 선택"/>
                    <input type="text" name="Explanation" value={inputInfoAll.Explanation} onChange={onChangeInput} style={{display:"block",  width:"350px", height:"30px", marginTop:"5px"}} placeholder="설명"/>
                    <input type="text" name="mail" value={inputInfoAll.mail} onChange={onChangeInput} style={{display:"block", width:"350px", height:"30px", marginTop:"5px"}} placeholder="이메일을 입력"/>
                    <input type="text" name="phone" value={inputInfoAll.phone}  onChange={onChangeInput} style={{display:"block", width:"350px", height:"30px", marginTop:"5px"}} placeholder="휴대폰 번호 입력"/>
                    <input type="text" name="department" value={inputInfoAll.department} onChange={onChangeInput} style={{display:"block", width:"350px", height:"30px", marginTop:"5px"}} placeholder="부서를 입력하세요(40자 이하)"/>
                    <input type="text" name="rank" value={inputInfoAll.rank}  onChange={onChangeInput} style={{display:"block", width:"350px", height:"30px", marginTop:"5px"}} placeholder="직급을 입력하세요(40자 이하)"/>
                    <input type="text" name="serverGroupAccessibility" value={inputInfoAll.serverGroupAccessibility}  onChange={onChangeInput} style={{display:"block", width:"350px", height:"30px", marginTop:"5px"}} placeholder="선택"/>
                    <input type="text" name="menuAccessibility" value={inputInfoAll.menuAccessibility} onChange={onChangeInput} style={{display:"block", width:"350px", height:"30px", marginTop:"5px"}} placeholder="선택"/>

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