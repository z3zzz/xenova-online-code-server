## Serverless Code Editor & Executor
- Web Assembly 활용, NodeJS 패키지 및 코드를 서버리스로 브라우저 상에서 실현할 수 있는 웹 프로그램

## 목차
* [프로젝트 개요](#프로젝트-개요)
* [문제 인식](#문제-인식)
* [해결 방안](#해결-방안)
* [사용 기술](#사용-기술)
* [실행 방법](#실행-방법)
* [대표 코드](#대표-코드)
* [시사점](#시사점)


## 프로젝트 개요
Serverless 코드 컴파일, 실행 플랫폼
- Web Assembly를 활용해 Node.JS 코드 및 패키지를 서버를 거치지 않고 브라우저상에서 실행 (PyScript의 Node 버전)

<br />

![image](https://user-images.githubusercontent.com/91174156/198204868-8f0cdd71-5bb9-4bc4-ae5c-ef5b26f55f4c.png)

<br />
- Concurrency 구현 (각 블록 별로 Worker Thread)
- Axios 등 라이브러리를 활용한 API 요청 가능

## 문제 인식
1. Code Sandbox, Codepen 등 기존 온라인 코드 에디터는 모두 서버 기반 (코드를 서버에 전송해 실행) -> 서버 부하 및 실행 속도 저하 
2. 페이지 새로고침 혹은 실행 시마다 서버에 패키지 설치 및 컴파일 진행으로 속도 저하
3. Python의 Jupyter Notebook과 같은 UI가 Javascript에서는 부재

## 해결 방안
1. NodeJS 번들러인 ESBuild의 Web Assembly를 활용해 브라우저에서 코드 컴파일 및 실행 -> 서버 부하 최소화  
2. 브라우저 상에서의 패키지 fetch를 위해 unpkg.com 활용, 캐싱 위해 IndexedDB를 활용, 각 블록의 코드 동시 실행을 위한 Worker Thread 활용 -> 실행 속도 향상
3. React, Redux 상태관리를 통한 Jupyter Notebook UI 구현 

## 사용 기술
* React 18 (Concurrency)
* Esbuild 2.2 (Web Assembly)
* Nginx
	
## 실행 방법
1. `git clone git@github.com:z3zzz/xenova-online-code-server.git` 
2. 코드 실행
 
```terminal
yarn install;
yarn start;
```

## 차별점
1. 최신 기술인 Web Assembly를 활용한 웹 기능 확장
2. ESBuild와 Unpkg.com을 연결하기 위한 플러그인 신규 개발 (fetch url 유형별 개발) 
3. 코드 블록의 추가, DND, 삭제, 통합 기능 제공으로 간편한 UI 

## 시사점
1. React, Axios, Styled-Components 와 같은 일반적인 조합에서 CodeSandbox 대비 40% 이상 향상된 코드 실행 속도, 서버 부하 80% 이상 감소
2. Web Assembly를 활용한 웹 기능 확장의 무한한 가능성에 대한 확인 (Linux의 Web Assembly 버전으로 서버 없는 온라인 Ubuntu 개발중)
