from backend.db import db

# Many-to-many association table between users and communities
user_communities = db.Table('user_communities',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), primary_key=True),
    db.Column('community_id', db.Integer, db.ForeignKey('communities.id', ondelete='CASCADE'), primary_key=True)
)

class Post(db.Model):
    __tablename__ = 'posts'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    body = db.Column(db.Text, nullable=False)
    
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'))
    community_id = db.Column(db.Integer, db.ForeignKey('communities.id', ondelete='CASCADE'))
    
    author = db.relationship('User', back_populates='posts')
    community = db.relationship('Community', back_populates='posts')
    comments = db.relationship('Comment', back_populates='post', cascade="all, delete-orphan")

class Community(db.Model):
    __tablename__ = 'communities'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), unique=True, nullable=False)
    
    members = db.relationship('User', secondary=user_communities, back_populates='communities')
    posts = db.relationship('Post', back_populates='community', cascade="all, delete-orphan")

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    
    communities = db.relationship('Community', secondary=user_communities, back_populates='members')
    comments = db.relationship('Comment', back_populates='user', cascade="all, delete-orphan")
    posts = db.relationship('Post', back_populates='author', cascade="all, delete-orphan")

class Comment(db.Model):
    __tablename__ = 'comments'
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp(), nullable=False)
    
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id', ondelete='CASCADE'), nullable=False)
    
    user = db.relationship('User', back_populates='comments')
    post = db.relationship('Post', back_populates='comments')
