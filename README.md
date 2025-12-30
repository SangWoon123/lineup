🚩 LineUp (실시간 매장 예약 시스템)
이 프로젝트는 실시간으로 매장 예약 현황을 확인하고 대기 순번을 관리하는 토이프로젝트 입니다.

⚙️ 환경 설정 (Environment Setup)
로컬 개발 환경을 구축하기 위해 아래 단계를 순서대로 진행하세요.

1. 프로젝트 이동 및 패키지 설치
   먼저 프로젝트 폴더로 이동한 뒤 필요한 패키지를 설치합니다.

Bash

cd lineup
npm install 2. 데이터베이스 설정 (.env)
프로젝트 루트 디렉토리에 .env 파일을 생성하고 아래 내용을 입력합니다. 데이터베이스 연결 주소는 본인의 PostgreSQL 설정에 맞게 수정하세요.

파일 경로: ./.env

코드 스니펫

# 데이터베이스 연결 URL (PostgreSQL)

# 형식: postgresql://사용자명:비밀번호@호스트:포트/DB명

DATABASE_URL="postgresql://line:1234@localhost:5432/linup?schema=public" 3. 데이터베이스 스키마 적용
Prisma를 사용하여 데이터베이스 모델을 생성하고 스키마를 동기화합니다.

Bash

# Prisma 클라이언트 생성

npx prisma generate

# DB 스키마 동기화 (테이블 생성)

npx prisma db push 4. 개발 서버 실행
모든 설정이 완료되었다면 아래 명령어로 서버를 실행합니다.

Bash

npm run dev
