from flask import Flask
from flask_migrate import Migrate
from flask_login import LoginManager
from flask_bcrypt import Bcrypt
from flask_session import Session
from openai import OpenAI, OpenAIError
import os,pathlib
from flask_cors import CORS
from db import db
from config import ApplicationConfig

data_folder_path = os.path.join(os.path.dirname(__file__), 'data')

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")

client_secrets_file = os.path.join(pathlib.Path(__file__).parent, "client-secret.json")

def create_app():
  app = Flask(__name__)
  app.config.from_object(ApplicationConfig)

  if not app.config['SECRET_KEY']:
    raise ValueError("No SECRET_KEY set for Flask application. Set it using environment variable.")
  
  app.config['SESSION_SQLALCHEMY'] = db
  
  db.init_app(app)
  Session(app)
  
  client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
  if client.api_key is None:
    raise OpenAIError("OpenAI API key is missing. Set it using OPENAI_API_KEY environment variable.")

  CORS(app, origins='http://localhost:3000')

  login_manager = LoginManager()
  login_manager.init_app(app)

  from models import User

  @login_manager.user_loader
  def load_user(id):
    return User.query.get(id)

  from routes import register_routes
  register_routes(app,db)

  Migrate(app,db)
  return app