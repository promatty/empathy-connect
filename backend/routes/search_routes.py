from flask import Blueprint, request, jsonify
from backend.models import Community, Post, User

search_blueprint = Blueprint('search_blueprint', __name__)

@search_blueprint.route('/search', methods=['GET'])
def search():
    query = request.args.get('q', '')
    if not query:
        return jsonify({'communities': [], 'posts': []}), 200

    communities = Community.query.filter(Community.name.ilike(f'%{query}%')).all()
    posts = Post.query.filter(Post.title.ilike(f'%{query}%') | Post.body.ilike(f'%{query}%')).all()

    return jsonify({
        'communities': [{'id': community.id, 'name': community.name} for community in communities],
        'posts': [{'id': post.id, 'title': post.title, 'body': post.body, 'username': User.query.get(post.user_id).username} for post in posts]
    }), 200