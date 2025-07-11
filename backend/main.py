from flask import Flask
from flask_cors import CORS
from firebase_admin import credentials, firestore, initialize_app
from routes.explanation import explanation_bp
from routes.generate import generate_bp
from routes.quiz import quiz_bp

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

cred = credentials.Certificate("")
firebase_app = initialize_app(cred)
db = firestore.client()

app.config["DB"] = db  

app.register_blueprint(explanation_bp)
app.register_blueprint(quiz_bp)
app.register_blueprint(generate_bp)

if __name__ == "__main__":
    app.run(debug=True)
