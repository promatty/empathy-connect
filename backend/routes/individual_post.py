from flask import Blueprint, request, jsonify
from backend.models import Post, User
from backend.db import db

post_blueprint = Blueprint('post_blueprint', __name__)

@post_blueprint.route('/create', methods=['POST'])
def create_post():
    data = request.json
    
    title = data.get('title')
    body = data.get('body')
    user_id = data.get('user_id')
    community_id = data.get('community_id')
    
    if not all([title, body, user_id, community_id]):
        return jsonify({"error": "All fields (title, body, user_id, community_id) are required"}), 400

    new_post = Post(title=title, body=body, user_id=user_id, community_id=community_id)
    db.session.add(new_post)
    db.session.commit()
    return jsonify({'message': 'Post created'}), 201

@post_blueprint.route('/<int:post_id>', methods=['GET'])
def get_post(post_id):
    post = Post.query.get_or_404(post_id)
    user = User.query.get(post.user_id)
    return jsonify({
        'id': post.id,
        'title': post.title,
        'body': post.body,
        'user_id': post.user_id,
        'community_id': post.community_id,
        'username': user.username
    }), 200

@post_blueprint.route('/<int:post_id>', methods=['PUT'])
def update_post(post_id):
    post = Post.query.get_or_404(post_id)
    data = request.json
    
    post.title = data.get('title', post.title)
    post.body = data.get('body', post.body)
    post.user_id = data.get('user_id', post.user_id)
    post.community_id = data.get('community_id', post.community_id)
    
    db.session.commit()
    return jsonify({'message': 'Post updated'}), 200

@post_blueprint.route('/<int:post_id>', methods=['DELETE'])
def delete_post(post_id):
    post = Post.query.get_or_404(post_id)
    db.session.delete(post)
    db.session.commit()
    return jsonify({'message': 'Post deleted'}), 200

@post_blueprint.route('/user/<int:user_id>', methods=['GET'])
def get_posts_by_user(user_id):
    posts = Post.query.filter_by(user_id=user_id).all()
    return jsonify([{
        'id': post.id,
        'title': post.title,
        'body': post.body,
        'community_id': post.community_id,
        'username': User.query.get(post.user_id).username
    } for post in posts]), 200

@post_blueprint.route('/community/<int:community_id>', methods=['GET'])
def get_posts_by_community(community_id):
    posts = Post.query.filter_by(community_id=community_id).all()
    return jsonify([{
        'id': post.id,
        'title': post.title,
        'body': post.body,
        'user_id': post.user_id,
        'username': User.query.get(post.user_id).username
    } for post in posts]), 200
