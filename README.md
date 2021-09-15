# ssac_server

###

- todolist_server 폴더와 ssac_react 폴더 보기 두개가 최종본 서로 연동가능

###

- npm 설치

  - npm install express

  - sudo npm install -g (폴더이름) // global 설치
  - sudo npm install (폴더이름) // 설치된 프로젝트에서만 사용 가능
  - express --view=ejs (설치할 폴더이름 기입)
  - sudo npm install -g nodemon
  - npm 설치 후 package.json 에서 scripts 안 start 밑에 "dev" : "nodemon ./bin/www" 작성
  - npm run dev 하면 서버 켜짐
  

### 데이터를 받아오는 4가지 방식

req.params -> /:id -> const{id} = req.params
req.query -> /?name=Kim -> const{name} = req.query
// params(단순 index번호에 사용), query(string에 사용) 는 url에 정보를 담아 보내는 형식으로 보안이 취약함 (get, delete 메소드에 많이 쓰임)

req.body -> const{images, url, category, postContent}
// body 는 보안에 강점이 있다. (post, put 메소드에 많이 쓰임)

req.file

- uri url 차이
  - https://meetup.toast.com/posts/92

### 통신 패키지

- axios 설치
  - yarn 설치한 폴더에 설치
  - yarn add axios
- npm install cors

  - 서버쪽에서 설치
  - // app.js 에 적어줘야 함
    // cors 도 require 해줘야함
    const cors = require("cors");

    var app = express();
    // app 밑에 써야함
    app.use(cors());

### AWS EC2 server setting

cf. S3 : simple storage service

- amazon으로부터 ubuntu server를 하나 빌리는 방식
- 인스턴스 작성법
  - aws -> EC2 -> 인스턴스 시작 -> 단계 6 : 보안 그룹 구성 까지 다음 누른후 6단계 : 보안 그룹 구성에서 유형 두개 추가 포드범위는 각각 80, 3000 설정 -> 소스는 사용자 지정 TCP 한 것 두개만 위치 무관 설정

```
!!!!!중요!!!!!
- pem key 파일은 별도로 잘 관리하자!
- billing은 상시 확인하자 - 의도치 않은 과금 방지
```

- 탄력적 ip 사용! -> 탄력적 IP 주소 할당 후에 작업에서 탄력적 IP 주소 연결을 방금 만든 인스턴스에 연결 (꼭 해줘야 돈 안냄) -> 확정 및 릴리즈...(사용 후에 릴리즈도 꼭 해주자 인스턴스도 종료시켜야함)

- FileZila에서 sftp를 이용하여 ubuntu로 로그인하고 개발파일 upload

  - (적용 방법) 11시에 아이콘 -> 프로토콜 SFTP설정 -> 호스트에는 aws에서 할당받은 탄력적 IP주소 입력 -> 로그온 유형은 키파일 -> 사용자는 ubuntu -> 키 파일은 pem key 다운받은 폴더 설정 -> 연결

- 자신이 서버개발한 폴더 ubuntu에 넣기 (폴더 위치 : /home/ubuntu)

- AWS instance 설치 후 puTTY를 이용해서 server 접근 // 윈도우 방식
  - https://mozi.tistory.com/191 참고
- ubuntu 접속 하려면 터미널로 키파일이 위치한 폴더 접속 후 인스턴트 페이지에서 연결 누른후 SSH 클라이언트에서 가장 밑에 있는 ssh ~~~부분 복사
- ubuntu 접속 후 node js와 npm 설치

  - sudo apt-get update
  - sudo apt-get install nodejs
  - sudo apt-get install npm

- 서버 실행을 위해 서버폴더 받은 곳으로 이동 후 npm run start
- AWS내 public DNS 주소로 접속
  - 개발 시 3000 포트를 이용하였으므로 :3000 붙여야 함
  - dns 주소로만 접근하기 위해서는 80포트 접근시 3000으로 redirect 필요
  - ubuntu에서 sudo iptables -A PREROUTING -t nat -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000
  - 입력시 주소창에서 3000번 포트 작성 안해도됨

### pm2 install 및 사용 -> 무중단 서비스 (서버를 계속 가동)

- pm2 개요 참고 : https://velog.io/@hojin9622/PM2-%EC%A0%95%EB%A6%AC
- server가 상시 open되어있게 하기 위해(상용화) 사용함
- 프로그램 update가 있는 경우엔 역시 pm2를 껐다가 다시 켜야 함

- 설치

  - VScode : sudo npm install -g pm2
  - ubuntu : sudo npm install -g pm2

- 사용 : VScode 와 unbuntu 동일

  - 시작 : pm2 start ./bin/www
  - 중지 : pm2 stop 0
  - 재시작 : pm2 restart www
  - 끄기 : pm2 delete www
  - 로그 확인 : pm2 logs www

- ubuntu 편집기 사용 - vi
  - ex) vi package.json으로 들어감
  - esc를 누르고 i 누ㄹ면 insert
  - start 밑에 "pm2 start ./bin/www"
  - 수정 후 esc 누르면 다시 복귀 -> :wq 누르면 저장하고 나가기

### s3 사용
- aws -> s3 -> 버킷 만들기 -> 1시에 내 아이디 누르면 내보안자격증명 들어간다 -> 왼쪽에 사용자 클릭 -> 쭉 진행하다보면 키 나옴 (중요하므로 구글링 해보자)
- 파일용량 부담을 덜어줌

### 이미지 파일 서버에 올리기
- *vscode*
- express --view=ejs (폴더이름)
- npm install   
- npm install multer multer-s3 aws-sdk

- multer 는 이미지 파일을 업로드, 저장할 때 사용
  - json 은 키 : 벨류값 

- postman 에서 http://localhost:3000/images
- body -> form-data -> key(imgs) -> value(내가 올릴 이미지)
- header -> key(context-type) -> value(multipart/form-data)

### mysql 설치법
- brew install mysql
- brew install mysql-client
- brew install --cask mysqlWorkbench

### mysqlWorkbench 사용범
- 스키마에 새로운 스키마 만들기
- name
- charactor utf8
- collation utf8 gernoral
- Tables에 설정
- id 에 PK, NN, AI 체크

### vscode
- npm install  mysql
- npm install mysql2
