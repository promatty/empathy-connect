from flask import Flask
from flask_cors import CORS
from backend.config import Config
from backend.db import db

app = Flask(__name__)
app.config.from_object(Config)

# Enable CORS for all origins
CORS(app, origins="*")

db.init_app(app)

from backend.routes.user_routes import user_blueprint
from backend.routes.individual_post import post_blueprint
from backend.routes.community_routes import community_blueprint
from backend.routes.search_routes import search_blueprint
from backend.routes.comment_routes import comment_blueprint

app.register_blueprint(user_blueprint, url_prefix='/users')
app.register_blueprint(post_blueprint, url_prefix='/posts')
app.register_blueprint(community_blueprint, url_prefix='/communities')
app.register_blueprint(search_blueprint, url_prefix='/search')
app.register_blueprint(comment_blueprint, url_prefix='/comments')
# Run app
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
