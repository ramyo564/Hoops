-- users 테이블 데이터 삽입
INSERT INTO users (id, password, email, name, birthday, gender, nick_name, play_style, ability, create_date, email_auth)
VALUES ('user1', '$2a$10$...', 'user1@example.com', 'John Doe', '1990-01-01', 'MALE', 'johndoe', 'AGGRESSIVE', 'SHOOT', '2023-05-01 10:00:00', true);

INSERT INTO users (id, password, email, name, birthday, gender, nick_name, play_style, ability, create_date, email_auth)
VALUES ('user2', '$2a$10$...', 'user2@example.com', 'Jane Smith', '1995-03-15', 'FEMALE', 'janesmith', 'BALANCE', 'PASS', '2023-05-01 11:30:00', false);

INSERT INTO users (id, password, email, name, birthday, gender, nick_name, play_style, ability, create_date, email_auth)
VALUES ('admin', '$2a$10$...', 'admin@example.com', 'Admin User', '1985-07-20', 'FEMALE', 'adminuser', 'DEFENSIVE', 'DRIBBLE', '2023-05-01 08:45:00', true);

-- member_roles 테이블 데이터 삽입
INSERT INTO member_roles (member_id, roles) VALUES ('user1', 'ROLE_USER');
INSERT INTO member_roles (member_id, roles) VALUES ('user2', 'ROLE_USER');
INSERT INTO member_roles (member_id, roles) VALUES ('admin', 'ROLE_ADMIN');
INSERT INTO member_roles (member_id, roles) VALUES ('admin', 'ROLE_USER');