//서버 생성하기
//http모듈(노드에 탑재된 글로벌모듈)을 로드한다.
const http = require('http'); 
const fs = require('fs');

const server = http.createServer((req, res) => {
  console.log(req.url, req.method, req.headers);
  
  //URL 파싱
  const url = req.url;
  const method= req.method;
  if( url === '/'){
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write(('<head><title>Enter message</title></head>'));
    res.write('<body><form action="/message" method="POST" name="message"><input type="text /><button type="submit">Go</button></form></body>');
    res.write('</html>');
    return res.end();
  }
  if( url === '/message' && method === 'POST'){
    //req.on을통해 특정 이벤트를 들을 수 잇다.

    const body = []//request body
    //데이터 받기 by 이벤트 리스너
    //새 청크가 읽힐때마다 데이터 이벤트가 발생(각 request에 data가 존재함!)할 때에 처리
    //두번째 인자로 이벤트가 발생핼을 때 실행될 함수를 정의
    req.on('data', (chunk)=>{
      body.push(chunk);
    });
    //end는 들어오는 요청데이터 혹은 전반적인 요청을 분석한 후에 발생.
    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody);
      const message = parsedBody.split('=')[1];
      //파일에 쓰기
      fs.writeFileSync('message.txt', message); 
    });
    res.statusCode = 302;
    res.setHeader('Location', '/');
    return res.end();
  }
  
  
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write(('<head><title>myfirst page</title></head>'));
  res.write('<body>Hello nice to meet you ! </body>');
  res.write('</html>');
  res.end();//이후로는 더이상 write해서는 안됨
  


  //process.exit(); //서버 중지, 이벤트 루프 종료, 프로그램 종료f
}); //서버 생성

server.listen(3000); //노드가 계속 실행되면서 요청을 듣도록 한다.



