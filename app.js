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
    fs.writeFileSync('message.txt', 'DUMMY'); //새로운 파일을 만들어 유저가 보낸 메세지 저장
    //res.writeHead(302, {} );
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



