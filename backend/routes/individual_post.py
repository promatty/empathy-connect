from flask import Blueprint, request, jsonify
from backend.models import Post
from backend.db import db
post_blueprint = Blueprint('post_blueprint', __name__)

@post_blueprint.route('/', methods=['POST'])
def create_post():
    data = request.json
    
    title = data.get('title')
    body = data.get('body')
    user_id = data.get('user_id')
    community_id = data.get('community_id')
    
    if not all([title, body, user_id, community_id]):
        return jsonify({"error": "All fields (title, body, user_id, community_id) are required"}), 400

    new_post = Post(title=title, body=body, user_id=user_id, community_id=community_id)
