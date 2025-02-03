import requests
from flask import Blueprint, jsonify, request, session
from ..app import allowed_users, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET
from ..models.user import User
from ..services import auth_service, user_service

auth_bp = Blueprint('auth_bp', __name__)

@auth_bp.route('/auth/login', methods=['POST'])
def login():
    auth_code = request.get_json()['code']

    if not auth_code:
        return jsonify(error="Authorization code is required"), 400
    
    token = auth_service.auth_code_for_token(auth_code)
    if not token:
        return jsonify(error="OAuth token exchange failed"), 401
    
    user_info = auth_service.get_user_info_by_token(token)
    if user_info["email"] not in allowed_users:
        return jsonify(error="Unauthorized"), 401

    user = user_service.get_user_by_email(user_info["email"])
    
    if not user:
        user_service.create_user(user_info=user_info)

    session["user_id"] = user.google_id
    
    return jsonify(user=user.to_dict()), 200

@auth_bp.route("/auth/logout", methods=["POST"])
def logout_user():
    session.pop("user_id")
    return "200"