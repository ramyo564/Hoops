DROP TABLE IF EXISTS member_roles;

-- 새로운 member_roles 테이블 생성
CREATE TABLE member_roles (
    member_id VARCHAR(255) NOT NULL,
    roles VARCHAR(255) NOT NULL
);

-- 기본키 설정
ALTER TABLE member_roles ADD CONSTRAINT member_roles_pk PRIMARY KEY (member_id, roles);