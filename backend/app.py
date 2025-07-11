from flask import Flask
from flask_cors import CORS
from firebase_admin import credentials, firestore, initialize_app
from routes.explanation import explanation_bp
from routes.quiz import quiz_bp

cred = credentials.Certificate("")
initialize_app(cred)

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

app.register_blueprint(explanation_bp)
app.register_blueprint(quiz_bp)

if __name__ == "__main__":
    app.run(debug=True)
