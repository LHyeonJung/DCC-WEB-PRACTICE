// https://ddeck.tistory.com/27?category=866566

// https://m.blog.naver.com/sejun3278/221569678512
// SSR (Server Side Rendering 실행되는 것) - 3000, 4000 두 포트를 모두 실행하여 데이터를 주고받을 수 있도록하는 것

const express = require('express'); // Node js를 위한 웹 프레임워크
const app = express();
const PORT = 4000;//process.env.PORT || 4000;
const cors = require("cors"); // 도메인 또는 포트가 다른 서버의 데이터를 요청할 수 있게끔 함 = 웹 브라우저에서 외부 도메인 서버와 통신하기 위한 방식을 표준화한 스펙 (현재 도메인과 다른 도메인으로 리소스가 요청될 경우 보안상의 이유로 브라우저에서 cors를 제한하고 있으나 express에서 cors를 허용하기 위해 사용함)
const bodyParser = require("body-parser"); // 클라이언트가 보내는 데이터를 읽기 위함
const db = require('./config/db');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors()); 
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
  });

app.get('/get_test_table', (req, res) => {
    db.query("select * from test_table", (err, data) => {
        if(!err) {
            res.send(data);

        } else {
            console.log(err);
            res.send(err);
        }
    })
})

app.get('/get_user_table', (req, res) => {
    db.query("select * from user", (err, data) => {
        if(!err) {
            res.send(data);

        } else {
            console.log(err);
            res.send(err);
        }
    })
})

app.post('/insert_user', (req, res) => {
    var sql = 'INSERT INTO user (id, pass, isSuperUser, isSecurityAgent, role, isOTP,isignOTPShared, info) VALUES(?,?,?,?,?,?,?,?)';
    var params = req.body.data;

    db.query(sql,params,function(err,rows,fields) {
        if(err){
            console.log("insert err - "+err);
            // res.send(err);
        }else{
            console.log("insert succeed - "+rows.insertId); // rows.insertId 는 db에 입력될때 생성되는 auto_increment 값을 알아낼수 있다.
            // res.send(data);
        }
    })
})

app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`);
})
