BEGIN;

CREATE TABLE IF NOT EXISTS USERS
(
    ID       SERIAL PRIMARY KEY,
    USERNAME VARCHAR(255) NOT NULL,
    PASSWORD VARCHAR(255) NOT NULL
    );

CREATE OR REPLACE FUNCTION insert_user(p_username TEXT, p_password TEXT)
    RETURNS JSON AS
$$
DECLARE
inserted_user JSON;
BEGIN
    IF NOT EXISTS (SELECT 1 FROM users WHERE username = p_username) THEN
        INSERT INTO users (username, password)
        VALUES (p_username, p_password)
        RETURNING to_json(users.*) INTO inserted_user;
END IF;

RETURN inserted_user;
END;
$$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION user_exists(username_param TEXT)
    RETURNS JSON AS
$$
DECLARE
user_data JSON;
BEGIN
SELECT json_build_object(
               'username', U.username,
               'password', U.password
           )
INTO user_data
FROM USERS U
WHERE U.username = username_param
    LIMIT 1;

RETURN user_data;
END;
$$
LANGUAGE plpgsql;

COMMIT;
