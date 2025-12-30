환경설정

cd line

## 1. 패키지 설치

npm install

## 2. 데이터베이스 설정

.env

### 데이터베이스 연결 URL (PostgreSQL)

### 형식: postgresql://사용자명:비밀번호@호스트:포트/DB명

DATABASE_URL="postgresql://line:1234@localhost:5432/linup?schema=public"

## 3. 데이터베이스 스키마 적용

npx prisma generate
npx prisma db push
