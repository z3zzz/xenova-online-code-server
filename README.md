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
3. 데이터 삽입 (각 데이터베이스) 
4. 서버 실행 

```terminal
cd back;
yarn install;
yarn start;
```
6. 클라이언트 실행

```terminal
cd front;
yarn install;
yarn start;
```

## 차별점
1. 하나의 API 프레임워크에서 복수의 Database 서버 연결 및 실시간 토글 기능
2. 수백만 텍스트 Row에 대한 인덱싱, 캐싱 및 각 데이터베이스 별 특성 비교 
3. 3개 서버로 구현된 분산 시스템
4. 코드 재사용성과 3계층 구조, 루즈 커플링 등 Back-End 설계 방법론에 대한 이해 및 적용


## 시사점
1. 300만 row의 경우 캐싱, 인덱싱 미적용 시 MySQL(2초 이하)이 MongoDB(5초 이하) 대비 우수 / 캐싱, 인덱싱 적용 시 MySQL(1.1초 이하)과 MongoDB(1.3초 이하) 성능 유사 
2. MongoDB의 경우 자동 캐싱이 이루어지는데, 이로인해 텍스트 서치 시 응답 시간의 일관성이 매우 낮음 (최소 0.5초, 최대 5초) / MySQL의 경우 응답 시간의 일관성이 높음
3. 인덱싱 적용 시 응답시간 평균 1초 내외로 사용자 경험 측면에서 큰 문제가 되지 않음 / 추가 리소스 사용 및 서비스 복잡도를 높이는 샤딩은 수백만 데이터 수준에서는 불필요함
4. 서비스 개발 시 DB 선정 및 설계는 해당 DB의 특징(예를 들어 MongoDB의 자동 캐싱 및 RAM 관리의 필요성), 인덱싱 적용 시의 성능, 서비스의 목적 및 사용자 경험을 모두 고려하여 신중하게 결정해야 하며, 샤딩은 최후의 수단으로 그 이전에 파티셔닝, 캐싱, 인덱싱을 우선 시도해야 함
5. 분산 시스템에서 DB 전환 시 Back-End 서버에의 영향은 DB pool에 연결할 때 사용하는 패키지뿐이며, 컨트롤러와 서비스 로직은 그대로임. 따라서 3계층 구조와 루즈 커플링을 적용하는 것이 코드 재사용률을 극대화할 수 있음
6. React 18에 새로 도입된 Transition, Suspense는 특수한 경우(UI 전환 시의 메모리 부하가 큰 경우)에 의미가 있고, 이외에는 큰 용도가 없음
