import React from 'react';

/*
"ffi-napi" 를 /page 하단에 있는 페이지 컴포넌트 코드에 넣으면 안되는 이유 [https://ppsu.tistory.com/74]
: NextJs는 페이지를 미리 생성해 두었다가 필요 시 로드해주는 방식인데, 프로그램이 실행되는 서버의 파일 시스템에 접근하려고 시도하면서 에러가 발생함 ("ModuleNotFuoundError: Modeul not found: Error: Cant' resuolve 'fs' in~")
-> 페이지 컴포넌트에 작성한 코드는 맨 처음에 호출할땐 Next.js 서버에서 실행되고, 이후 라우터로 페이지를 이동한 경우 클라이언트(즉, 사용자 브라우저)에서도 실행될 수 있음 
==> 그래서 서버에 있는 파일에 접근하면 오류가 나도록 막아놓은 것

해결방안: 서버에서만 실행되는 코드에 넣으면 됨 (api 디렉터리 하위)
*/

export default (req, res) => 
{
  if(req.method === 'POST')
  {
    // POST 요청에 대한 처리

    //const ffi = require("ffi-napi"); // 이걸 page 디렉터리 바로 하위에서 하면 에러남 (서버에서만 실행되는 api 디렉터리 내에 포함)

    // console.log("1");
    // // const arch = process.arch;

    // // const lib = ffi.Library(path.resolve(__dirname, `../../reference/${arch}`), {
    // //     "CIS_CC_Init": ["int", []]//"factorial": ["uint64", ["int"]]
    // // });

    // const lib2 = ffi.Library(path.join(process.referencePath, 'reference', 'DccUtils.dll'),
    // {
    //     "CIS_CC_Init": ["int", []]
    // })

    // console.log("2");
    //console.log(lib2.CIS_CC_Init());
  }  
  else
  {
    //나머지 메서드에 대한 처리
  }
}