from flask import Flask, Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import db
from app.forms import ApplicationForm
application_routes = Blueprint('application', __name__)

@login_required
@application_routes.route('/new', methods=["POST"])
def add_one_application():
    form = ApplicationForm();
    form['csrf_token'].data = request.cookies['csrf_token']

    print(form.data)
    return {}
