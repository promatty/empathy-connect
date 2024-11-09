from flask import Flask
from backend.config import Config
from backend.db import db

app = Flask(__name__)
app.config.from_object(Config)


db.init_app(app)

from backend.routes.user_routes import user_blueprint
from backend.routes.individual_post import post_blueprint
from backend.routes.community_routes import community_blueprint

app.register_blueprint(user_blueprint, url_prefix='/users')
app.register_blueprint(post_blueprint, url_prefix='/posts')
app.register_blueprint(community_blueprint, url_prefix='/communities')

# Run app
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
