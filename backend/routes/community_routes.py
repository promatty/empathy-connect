from flask import Blueprint, request, jsonify
from backend.models import User, Community, Post
from backend.db import db

community_blueprint = Blueprint('community_blueprint', __name__)

@community_blueprint.route('/', methods=['POST'])
def create_community():
    data = request.json
    if 'name' not in data:
        return jsonify({'message': 'Community name is required'}), 400
    
    new_community = Community(name=data['name'])
    db.session.add(new_community)
    db.session.commit()
    return jsonify({'message': 'Community created', 'id': new_community.id}), 201

@community_blueprint.route('/<int:community_id>', methods=['GET'])
def get_community(community_id):
    community = Community.query.get_or_404(community_id)
    posts = Post.query.filter_by(community_id=community_id).all()
    return jsonify({
        'id': community.id,
        'name': community.name,
        'posts': [{
            'id': post.id,
            'title': post.title,
            'body': post.body,
            'user_id': post.user_id,
            'username': User.query.get(post.user_id).username
        } for post in posts]
    }), 200

@community_blueprint.route('/', methods=['GET'])
def get_all_communities():
    communities = Community.query.all()
    return jsonify([{
        'id': community.id,
        'name': community.name
    } for community in communities]), 200

@community_blueprint.route('/<int:community_id>', methods=['PUT'])
def update_community(community_id):
    community = Community.query.get_or_404(community_id)
    data = request.json
    if 'name' in data:
        community.name = data['name']
    db.session.commit()
    return jsonify({'message': 'Community updated'}), 200

@community_blueprint.route('/<int:community_id>', methods=['DELETE'])
def delete_community(community_id):
    community = Community.query.get_or_404(community_id)
    db.session.delete(community)
    db.session.commit()
    return jsonify({'message': 'Community deleted'}), 200

@community_blueprint.route('/user/<int:user_id>/communities', methods=['GET'])
def get_communities_for_user(user_id):
    user = User.query.get_or_404(user_id)
    communities = user.communities
    return jsonify([{
        'id': community.id,
        'name': community.name
    } for community in communities]), 200



@community_blueprint.route('/<int:community_id>/posts', methods=['GET'])
def get_community_with_posts(community_id):
    community = Community.query.get_or_404(community_id)
    
    response = {
        'id': community.id,
        'name': community.name,
        'posts': [
            {
                'id': post.id,
                'title': post.title,
                'body': post.body,
                'user_id': post.user_id,
                'username': User.query.get(post.user_id).username
            } for post in community.posts
        ]
    }
    
    return jsonify(response), 200

@community_blueprint.route('/add_user', methods=['POST'])
def add_user_to_community():
    data = request.json
    user_id = data.get('user_id')
    community_id = data.get('community_id')

    if not user_id or not community_id:
        return jsonify({'error': 'Both user_id and community_id are required.'}), 400

    user = User.query.get(user_id)
    community = Community.query.get(community_id)

    if not user:
        return jsonify({'error': 'User not found.'}), 404

    if not community:
        return jsonify({'error': 'Community not found.'}), 404

    if user in community.members:
        return jsonify({'message': 'User is already a member of this community.'}), 400

    community.members.append(user)
    db.session.commit()
    return jsonify({'message': 'added'}), 201

@community_blueprint.route('/remove_user', methods=['POST'])
def remove_user_from_community():
    data = request.json
    user_id = data.get('user_id')
    community_id = data.get('community_id')

    if not user_id or not community_id:
        return jsonify({'error': 'Both user_id and community_id are required.'}), 400

    user = User.query.get(user_id)
    community = Community.query.get(community_id)

    if not user:
        return jsonify({'error': 'User not found.'}), 404

    if not community:
        return jsonify({'error': 'Community not found.'}), 404

    if user not in community.members:
        return jsonify({'message': 'User is not a member of this community.'}), 400

    community.members.remove(user)
    db.session.commit()
    return jsonify({'message': 'removed'}), 200