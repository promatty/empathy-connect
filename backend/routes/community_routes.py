from flask import Blueprint, request, jsonify
from backend.models import User, Community
from backend.db import db

# Create the Blueprint for community routes
community_blueprint = Blueprint('community_blueprint', __name__)

# Create a new community
@community_blueprint.route('/', methods=['POST'])
def create_community():
    data = request.json
    if 'name' not in data:
        return jsonify({'message': 'Community name is required'}), 400

    new_community = Community(name=data['name'])
    db.session.add(new_community)
    db.session.commit()
    return jsonify({'message': 'Community created', 'id': new_community.id}), 201

# Retrieve a specific community by ID
@community_blueprint.route('/<int:community_id>', methods=['GET'])
def get_community(community_id):
    community = Community.query.get_or_404(community_id)
    return jsonify({
        'id': community.id,
        'name': community.name
    }), 200

# Retrieve all communities
@community_blueprint.route('/', methods=['GET'])
def get_all_communities():
    communities = Community.query.all()
    return jsonify([{
        'id': community.id,
        'name': community.name
    } for community in communities]), 200

# Update a specific community by ID
@community_blueprint.route('/<int:community_id>', methods=['PUT'])
def update_community(community_id):
    community = Community.query.get_or_404(community_id)
    data = request.json
    if 'name' in data:
        community.name = data['name']
    db.session.commit()
    return jsonify({'message': 'Community updated'}), 200

# Delete a specific community by ID
@community_blueprint.route('/<int:community_id>', methods=['DELETE'])
def delete_community(community_id):
    community = Community.query.get_or_404(community_id)
    db.session.delete(community)
    db.session.commit()
    return jsonify({'message': 'Community deleted'}), 200

# Retrieve all communities associated with a specific user
@community_blueprint.route('/user/<int:user_id>/communities', methods=['GET'])
def get_communities_for_user(user_id):
    user = User.query.get_or_404(user_id)
    communities = user.communities
    return jsonify([{
        'id': community.id,
        'name': community.name
    } for community in communities]), 200

# Retrieve a community along with all associated posts
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
                'body': post.body
            } for post in community.posts
        ]
    }
    return jsonify(response), 200
