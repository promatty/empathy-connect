from flask import Blueprint, request, jsonify
from backend.models import User, Post, Comment
from backend.db import db

comment_blueprint = Blueprint('comment_blueprint', __name__)

@comment_blueprint.route('/add', methods=['POST'])
def create_comment():
    data = request.json
    user_id = data.get('user_id')
    post_id = data.get('post_id')
    content = data.get('content')

    if not user_id or not post_id or not content:
        return jsonify({'error': 'user_id, post_id, and content are required.'}), 400

    user = User.query.get(user_id)
    post = Post.query.get(post_id)

    if not user:
        return jsonify({'error': 'User not found.'}), 404

    if not post:
        return jsonify({'error': 'Post not found.'}), 404

    new_comment = Comment(content=content, user_id=user_id, post_id=post_id)
    db.session.add(new_comment)
    db.session.commit()

    return jsonify({
        'message': 'Comment created',
        'comment': {
            'id': new_comment.id,
            'content': new_comment.content,
            'user_id': new_comment.user_id,
            'post_id': new_comment.post_id
        }
    }), 201

@comment_blueprint.route('/<int:comment_id>', methods=['GET'])
def get_comment(comment_id):
    comment = Comment.query.get_or_404(comment_id)
    return jsonify({
        'id': comment.id,
        'content': comment.content,
        'user_id': comment.user_id,
        'post_id': comment.post_id,
        'username': User.query.get(comment.user_id).username
    }), 200

@comment_blueprint.route('/post/<int:post_id>', methods=['GET'])
def get_comments_for_post(post_id):
    post = Post.query.get_or_404(post_id)
    comments = Comment.query.filter_by(post_id=post_id).all()
    return jsonify([{
        'id': comment.id,
        'content': comment.content,
        'user_id': comment.user_id,
        'username': User.query.get(comment.user_id).username
    } for comment in comments]), 200

@comment_blueprint.route('/<int:comment_id>', methods=['PUT'])
def update_comment(comment_id):
    comment = Comment.query.get_or_404(comment_id)
    data = request.json
    content = data.get('content')

    if not content:
        return jsonify({'error': 'Content is required.'}), 400

    comment.content = content
    db.session.commit()
    return jsonify({'content':comment.content}), 200

@comment_blueprint.route('/<int:comment_id>', methods=['DELETE'])
def delete_comment(comment_id):
    comment = Comment.query.get_or_404(comment_id)
    db.session.delete(comment)
    db.session.commit()
    return jsonify({'message': 'Comment deleted'}), 200
