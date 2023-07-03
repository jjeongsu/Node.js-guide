console.log('hello from node.js');
//파일 시스템 기능 활용
const fs = require('fs'); //모듈 import
fs.writeFileSync('hello.txt','Hello from node js');
//파일 시스템 모듈을 활요하여 파일 생성
//첫번째 파라미터: 파일명이 포함된 파일 경로
//두번째 파아리터: 파일의 내용