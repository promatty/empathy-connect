-- Insert sample users
INSERT INTO users (username, password) VALUES 
('alice', 'hashed_password1'),
('bob', 'hashed_password2'),
('charlie', 'hashed_password3');

-- Insert sample communities
INSERT INTO communities (name) VALUES 
('Community A'),
('Community B'),
('Community C');

-- Insert sample posts and associate them with users and communities
INSERT INTO posts (title, body, user_id, community_id) VALUES 
('First Post', 'This is Alice\'s first post in Community A', 1, 1),
('Second Post', 'This is Bob\'s first post in Community B', 2, 2),
('Third Post', 'This is Charlie\'s post in Community C', 3, 3),
('Another Post', 'This is Alice\'s second post in Community A', 1, 1);

-- Insert sample user-community relationships (many-to-many)
INSERT INTO user_communities (user_id, community_id) VALUES 
(1, 1),  -- Alice in Community A
(2, 2),  -- Bob in Community B
(3, 3),  -- Charlie in Community C
(1, 2),  -- Alice also joins Community B
(2, 1);  -- Bob also joins Community A
