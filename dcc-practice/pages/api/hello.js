// Next.js API route support: https://nextjs.org/docs/api-routes/introduction


/*
NextJs에서 함수 하나로 API 만들기 (https://ppsu.tistory.com/67?category=853184)

: 아래와 같은 형태로 만들면 됨

export default (req, res) => 
{
  if(req.method === 'POST')
  {
    // POST 요청에 대한 처리
  }  
  else
  {
    나머지 메서드에 대한 처리
  }
}
 */

// http://localhost:3000/api/hello 접속 시 정의한 json 나옴
export default (req, res) => {
  res.status(200).json({ name: 'John Doe' })
}
