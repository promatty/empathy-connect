from flask import Blueprint, request, jsonify
from ..models import Post
from .. import db

def create_post():
    data = request.json
    
    title = data.get('title')
    body = data.get('body')
    user_id = data.get('user_id')
    community_id = data.get('community_id')
    
    if not all([title, body, user_id, community_id]):
        return jsonify({"error": "All fields (title, body, user_id, community_id) are required"}), 400

    new_post = Post(title=title, body=body, user_id=user_id, community_id=community_id)

    try:
        db.session.add(new_post)
        db.session.commit()
        return jsonify({"message": "Post created successfully", "post_id": new_post.id}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
