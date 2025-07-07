import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate("./todolist-6deff-firebase-adminsdk-fbsvc-6f701a5e4f.json")
firebase_admin.initialize_app(cred)

db = firestore.client()
