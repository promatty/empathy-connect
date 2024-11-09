from flask import Blueprint, request, jsonify
from ..models import User
from .. import db

user_blueprint = Blueprint('user_blueprint', __name__)

@user_blueprint.route('/', methods=['POST'])
def create_user():
    data = request.json
    new_user = User(username=data['username'], password=data['password'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User created'}), 201