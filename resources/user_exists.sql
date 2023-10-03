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