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