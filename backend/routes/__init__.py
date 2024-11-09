from .user_routes import user_blueprint
from .post_routes import post_blueprint
from .community_routes import community_blueprint

def register_routes(app):
    app.register_blueprint(user_blueprint, url_prefix='/users')
    app.register_blueprint(post_blueprint, url_prefix='/posts')
    app.register_blueprint(community_blueprint, url_prefix='/communities')