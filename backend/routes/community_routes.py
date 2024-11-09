from flask import Blueprint, request, jsonify
from backend.models import Community
from backend.db import db

community_blueprint = Blueprint('community_blueprint', __name__)

@community_blueprint.route('/', methods=['POST'])
def create_community():
    try:
        # Get the data from the request
        data = request.json
        
        # Ensure the 'name' field is in the request
        if 'name' not in data:
            return jsonify({'message': 'Community name is required'}), 400
        
        # Create a new community instance and add it to the database
        new_community = Community(name=data['name'])
        db.session.add(new_community)
        db.session.commit()
        
        # Return a success response
        return jsonify({'message': 'Community created', 'id': new_community.id}), 201
    
    except Exception as e:
        db.session.rollback()  # Rollback the transaction in case of error
        return jsonify({'message': f'Error creating community: {str(e)}'}), 500
