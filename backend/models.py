from backend.db import db

# Many-to-many association table between users and communities
user_communities = db.Table('user_communities',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), primary_key=True),
    db.Column('community_id', db.Integer, db.ForeignKey('communities.id', ondelete='CASCADE'), primary_key=True)
)

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    
    communities = db.relationship('Community', secondary=user_communities, back_populates='members')

    posts = db.relationship('Post', back_populates='author', cascade="all, delete-orphan")

class Community(db.Model):
    __tablename__ = 'communities'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), unique=True, nullable=False)
    
   
    members = db.relationship('User', secondary=user_communities, back_populates='communities')
    
    
    posts = db.relationship('Post', back_populates='community', cascade="all, delete-orphan")

class Post(db.Model):
    __tablename__ = 'posts'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    body = db.Column(db.Text, nullable=False)
    
    # Foreign keys to associate with user and community
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'))
    community_id = db.Column(db.Integer, db.ForeignKey('communities.id', ondelete='CASCADE'))
    
    # Relationships to link back to user and community
    author = db.relationship('User', back_populates='posts')
    community = db.relationship('Community', back_populates='posts')
