# Viewer-Distribtion

뷰어 자동 배포툴

## 사용법

1.  git clone or git pull 받기

2.  npm 설치하기:

        $ npm install

3.  서버 실행하기:

        $ node server.js

4.  브라우저에서 접속하기:

    - http://localhost:5005

5.  prodoceye-viewer 폴더 경로, prodoceye 폴더 경로 입력

6.  뷰어 배포 버튼 클릭

7.  화면에서 배포 로그 확인

8.  빌드 완료 로그 확인하면 prodoceye-viewer 폴더, prodoceye 폴더 확인하기

## 주의점

1. viewer.html

   - 주석 local ~ local-end 사이에 있는 코드 삭제
   - 주석 prop ~ prop-end 사이에 있는 코드 적용

2. prodoceye-viewer, prodoceye 폴더 경로
   - git pull, push 받는 폴더 경로
