CREATE OR REPLACE FUNCTION insert_user(p_username text, p_password text)
    RETURNS JSON AS
$$
DECLARE
inserted_user JSON;
BEGIN
    IF EXISTS (SELECT 1 FROM users WHERE username = p_username) THEN
        RETURN jsonb_build_object('message', 'El usuario ya existe');
END IF;

INSERT INTO users (username, password)
VALUES (p_username, p_password)
    RETURNING to_json(users.*) INTO inserted_user;

RETURN inserted_user;
END;
$$ LANGUAGE plpgsql;